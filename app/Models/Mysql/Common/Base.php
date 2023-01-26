<?php
namespace App\Models\Mysql\Common;

use Illuminate\Database\Eloquent\Model;
use App\Common\Functions;
use App\Common\Validator;

use App\Http\Controllers\Response;

use Formatter;
use ApiAuth;

class Base extends Model {

	// links to the database table. Should be named the same as the table in database
    public $table = '';
    
    // managed properties for each model
    const PROPERTIES = [];


    const SEARCH_PARAMETERS = [];
    //const METHOD_SETS = [];

    // class map to specify which class to manipulate through the api
	const CLASS_MAP = [
        'orderitem' => OrderItem::class
	];

    // override default input validator and check inputs myself
 /*	protected function validateInputs($request)
    {
        return true;
    }*/

    // generic add for models
    /*public function add($request)
    {
        $validate_result = $this->validateInputs($request);
        if ($validate_result !== true) return $validate_result;
        $this->save();
        return true;
    }

    // generic set for models
    public function set($request)
    {
        $response = new Response;
        $validate_result = $this->validateInputs($request);
        if ($validate_result !== true) return $validate_result;
        $this->save();
        return $response->setSuccess();
    }*/

    // generic search methoxd
    public static function search($request, &$query) {
        $query->select($query->from . '.*')
              ->groupBy($query->from . '.id');
        return true;
    }

	// get class from class key
	public static function getClassFromClassKey($class_key) {
        $class = get_called_class();
		if (isset($class::CLASS_MAP[$class_key])) return $class::CLASS_MAP[$class_key];
		return null;
	}


    // method to help build models that stack on each other but keep number of queries low
    // uses the model pairs to get all the models
    public $model_pairs = [];
    public function getModelWherePairs()
    {
        return [];
    }

    public function getModel($request = null) {
        $class = get_class($this);
        return $class::getModels([$this], $request)[0];
    }

    public static function getModels($collection, $request = null, $ignore_classes = [])
    {
        $class = get_called_class();

        $new_ignore_classes = $ignore_classes;
        $new_ignore_classes[] = get_called_class();
        $include_classes = [];

        // get include classes from request
        if (isset($request))
        {
            $exploded_include_classes = explode(',', $request->get('include_classes', ''));
            foreach ($exploded_include_classes as $include_class_request) {
                $include_class = $class::getClassFromClassKey($include_class_request);
                if (isset($include_class)) $include_classes[] = $include_class;
            }
        }

        $models = [];
        if (count($collection) > 0)
        {
            $ids = [];
            $model_pairs = $collection[0]->model_pairs;
            $model_pairs_where = $collection[0]->model_pairs_where;

            // for find
            foreach ($model_pairs as $model_pair) {
                $identifier = $model_pair[1];
                $ids[$model_pair[0]] = [];
                foreach ($collection as $element) {
                    if ($element->$identifier != null) $ids[$model_pair[0]][] = $element->$identifier; 
                }
            }

            $sub_collections = [];
            $sub_models_mapped = [];

            // for find
            foreach ($model_pairs as $model_pair) {  
                $class = $model_pair[2];
                if (in_array($class, $ignore_classes)) continue;
                if (!in_array($class, $include_classes)) continue;
                $class_model = new $class;
                $sub_collections[$model_pair[0]] = $class::whereIn($class_model->primaryKey, $ids[$model_pair[0]]);
                $new_ignore_classes = $ignore_classes;
                $new_ignore_classes[] = $class;
                $sub_models_mapped[$model_pair[0]] = $class::getModelsMapped($sub_collections[$model_pair[0]]->get(), $request, $new_ignore_classes);
            }

            // for where
            foreach ($collection as $element) {
                foreach ($element->getModelWherePairs() as $model_pair_where) {
                    $class = $model_pair_where[2];
                    if (in_array($class, $ignore_classes) && (!isset($model_pair_where[3]) || !$model_pair_where[3])) continue;
                    if (!in_array($class, $include_classes)) continue;
                    $class_model = new $class;
                    if (!isset($sub_collections[$model_pair_where[0]])) $sub_collections[$model_pair_where[0]] = $class::where($model_pair_where[1]);
                    else $sub_collections[$model_pair_where[0]]->orWhere($model_pair_where[1]);
                }
            }

            foreach ($collection[0]->getModelWherePairs() as $model_pair_where) {  
                $class = $model_pair_where[2];
                $new_ignore_classes = $ignore_classes;
                $new_ignore_classes[] = $class;
                if (isset($sub_collections[$model_pair_where[0]])) $sub_models_mapped[$model_pair_where[0]] = $class::getModelsMapped($sub_collections[$model_pair_where[0]]->get(), $request, $new_ignore_classes);
            }

            foreach ($collection as $element) {
                foreach ($model_pairs as $model_pair) {    
                    $identifier = $model_pair[1];
                    if (isset($sub_models_mapped[$model_pair[0]][$element->$identifier])) $element->setSubModel($model_pair[0], $sub_models_mapped[$model_pair[0]][$element->$identifier]);
                }
                foreach ($element->getModelWherePairs() as $model_pair_where) {  
                    if (isset($sub_models_mapped[$model_pair_where[0]]))
                    {
                        $sub_elements = array_filter($sub_models_mapped[$model_pair_where[0]], function($mapped_model) use ($model_pair_where)
                        {
                            foreach ($model_pair_where[1] as $where_arg) {
                                $identifier = $where_arg[0];
                                if ($where_arg[1] == '=' && $mapped_model->$identifier != $where_arg[2])
                                {
                                    return false;
                                } 
                            }
                            return true;
                        });
                        $element->setSubModel($model_pair_where[0], array_values($sub_elements));
                    }
                }
                $models[] = $element;
            }

        }

        return $models;
    }

    public static function getModelsMapped($collection = [], $request = null, $ignore_classes = [])
    {
        $mapped_models = [];

        $class = get_called_class();
        $model = new $class;
        $primary_id = $model->primaryKey;
        $models = $class::getModels($collection, $request, $ignore_classes);
        foreach ($models as $model) {
            $mapped_models[$model->$primary_id] = $model;
        }
        return $mapped_models;
    }

    protected $added_attributes = [];
    public function populateSubModelWhere($sub_model_property, $where_pairs, $class)
    {   
        if (!isset($this->$sub_model_property)) 
        {
            $this->$sub_model_property = $class::where($where_pairs)->get();
            if (isset($this->$sub_model_property)) 
            {
                $this->attributes[$sub_model_property] = $class::getModels($this->$sub_model_property, [[get_called_class()]]);
                $this->added_attributes[] = $sub_model_property;
            }
        }
    }
    public function populateSubModel($sub_model_property, $sub_id_property, $class)
    {   
        if (!isset($this->$sub_model_property)) 
        {
            $this->$sub_model_property = $class::find($this->$sub_id_property);
            if (isset($this->$sub_model_property))
            { 
                $this->attributes[$sub_model_property] = $this->$sub_model_property->model; 
                $this->added_attributes[] = $sub_model_property;
            }
        }
    }

    public function save(array $options = array())
    {
        $temp_attributes = [];
        foreach ($this->added_attributes as $added_attribute) {
            $temp_attributes[$added_attribute] = $this->attributes[$added_attribute];
            unset($this->attributes[$added_attribute]);
        }
        foreach ($this->attributes as $key => $value) {
            if ($value === 'NULL') $this->$key = null;
        }

        parent::save($options);
        foreach ($this->added_attributes as $added_attribute) {
            $this->attributes[$added_attribute] = $temp_attributes[$added_attribute];
        }
    }


    public function setSubModel($sub_model_property, $sub_model)
    {
        if (!isset($this->$sub_model_property))
        {
            $this->$sub_model_property = $sub_model;
            $this->attributes[$sub_model_property] = $sub_model; 
            $this->added_attributes[] = $sub_model_property;
        }
        else 
        {
            $this->$sub_model_property = $sub_model;
            $this->attributes[$sub_model_property] = $sub_model; 
        }
    }

    
	/**purpose
	 *   apply filters to search query)
	 * args
	 *   request
	 *   $query (reference)
	 * returns
	 *   search_applied
	 */
    public static function applyFilters($request, &$query)
    {
        // get class from called class
        $class = get_called_class();

        // iterate through the search parameters and apoly search to query
        foreach ($class::SEARCH_PARAMETERS as $search_parameter) {
            
        	// check to see if argument exists in the request otherwise continue
            if (!$request->has($search_parameter['argument']) && !isset($search_parameter['default'])) continue;

            // get argument search parameter
            $argument = $request->get($search_parameter['argument'], isset($search_parameter['default']) ? $search_parameter['default'] : null);
            if ($argument === 'NULL') $argument = null;

            // create temp model to get table
            $temp_model = new $class;
            $get_column_path = function ($path) use ($temp_model) {
                if (strpos($path, '.') === false) {
                    return $temp_model->table . '.' . $path;
                } 
                else return $path;
            };

            // depending on the type filter they models by argument
            switch ($search_parameter['type'])
            {
                case 'EQUAL':
                    $query->where($get_column_path($search_parameter['column']), '=', $argument);
                    break;
                case 'SEARCH':
                	// check if there is sequal injection possibility here ---------------------------- **********************
                    $where_raw = [];
                    foreach (explode(' ', $argument) as $query) {
                        $columnQueries = [];
                        foreach ($search_parameter['columns'] as $column) $columnQueries[] = $get_column_path($column) . " LIKE \"%$query%\"";
                        $where_raw[] = '(' . implode(' OR ', $columnQueries) . ')';
                    }
                    $query->whereRaw(implode(' AND ', $where_raw));
                    break;
                	// check if there is sequal injection possibility here --------------------------- **********************
                case 'IN':
                    $query->whereIn($get_column_path($search_parameter['column']), explode(',', $argument));
                    break;
                case 'NOTIN': 
                    $query->whereNotIn($get_column_path($search_parameter['column']), explode(',', $argument));
                    break;
                case 'GREATER':
                    $query->where($get_column_path($search_parameter['column']), '>=', $argument);
                    break;
                case 'LESSER':
                    $query->where($get_column_path($search_parameter['column']), '<=', $argument);
                    break;
                default:
                    return 'Invalid type set in model configuration - ' . $search_parameter['type'];
            }
        }

        return $class::search($request, $query);
    }


    /**purpose
     *   apply order by 
     * args
     *   request
     *   class
     *   models query (by ref)
     * returns
     *   order by applied
     */
    public static function applyOrderBy($request, &$query)
    {
        $order_bys = json_decode($request->get('order_by', json_encode([
            [
                'column' => 'created_at',
                'direction' => 'DESC'
            ]
        ])));

        $get_column_path = function ($path) use ($query) {
            if (strpos($path, '.') === false) {
                return $query->from . '.' . $path;
            } 
            else return $path;
        };

        foreach ($order_bys as $key => $order_by) {
            if (!isset($order_by->direction) || !isset($order_by->column)) continue;
            $query->orderBy($get_column_path($order_by->column), $order_by->direction);
            $query->addSelect($get_column_path($order_by->column));
        }
    }

    
/*
    public function deactivate() {
        $response = new Response;
        return $response->setFailure('Deactivate not implemented on model');
    }*/

    /*

    public function hasPermissionSet() { 
        return false;
    }*/

    /**purpose 
     *   generic method to get properties
     * args
     *   (none)
     * returns
     *   properties
     */
    public static function getProperties() {

        $class = get_called_class();

        $properties = [];
        foreach($class::PROPERTIES as $key => $property) {
            if (isset($property['label'])) $properties[$key] = $property;
        }

        return $properties;

    }


    public static function create($request) {

        $response = new Response;

        // create the model
        $class = get_called_class();
        $model = new $class;

        // loop through properties of model
        $properties = $class::PROPERTIES;

        // required keys
        $required_keys = [];
        foreach($properties as $property) {
            // if property is nullable we do not need to add to required properties
            if (isset($property['nullable']) && $property['nullable']) continue;

            // if property has a default value we do not need to add to quired properties
            if (isset($property['default'])) continue;

            // add to required properties
            $required_keys[] = $property['key'];
        }
        if (!$response->hasRequired($request, $required_keys)) {
            return $response->setFailure(('Missing required fields'));
        }
        
        foreach($properties as $property) {

            $value = trim($request->get($property['key']));
            switch($property['type']) {
                case 'TEXT':
                    if (Functions::isEmpty($value)) return $response->setFailure(('Invalid ' . $property['key']));
                    $model->{$property['key']} = $value;
                    break;
                case 'MODEL_ID':
                    if (!isset($property['class'])) return $response->setFailure('Class must be set for type MODEL_ID');
                    $class_model = $property['class']::find($value);
                    if (!isset($class_model)) return $response->setFailure(('Invalid ' . $property['key']));
                    $model->{$property['key']} = $value;
                    break;
                case 'ENUM': 
                    if (!isset($property['options'])) return $response->setFailure('Options must be set for type ENUM');
                    if (!in_array($value, $property['options'])) return $response->setFailure(('Invalid ' . $property['key']));
                    $model->{$property['key']} = $value;
                    break;
                case 'BOOLEAN':
                    $model->{$property['key']} = Validator::validateBoolean($value);
                    break;
                case 'INTEGER':
                    $value = (int) $value;
                    if (isset($property['min']) && $value < $property['min']) return $response->setFailure(('Value is below minimum - ' . $property['key']));
                    if (isset($property['max']) && $value > $property['max']) return $response->setFailure(('Value is above maximum - ' . $property['key']));
                    $model->{$property['key']} = $value;
                    break;
                case 'FLOAT':
                    $value = (float) $value;
                    if (isset($property['min']) && $value < $property['min']) return $response->setFailure(('Value is below minimum - ' . $property['key']));
                    if (isset($property['max']) && $value > $property['max']) return $response->setFailure(('Value is above maximum - ' . $property['key']));
                    $model->{$property['key']} = $value;
                    break;
                default:
                    return $response->setFailure('Type not implemented ' . $property['type'] . ' for ' . $property['key']);
            }
        }


        // save the model
        $model->save();
        $response->set('model', $model);

        // return success
        return $response->setSuccess();
    }

    /**purpose
     *   set model properties
     * args
     *   request with properties
     * returns
     *   model
     */

    public function set($request) {

        // create a response
        $response = new Response;

        // create the model
        $class = get_called_class();

        // loop through properties of model
        $properties = $class::PROPERTIES;
        
        foreach($properties as $property) {
            if ($request->has($property['key'])) {
                
                $value = trim($request->get($property['key']));
                switch($property['type']) {
                    case 'TEXT':
                        if (Functions::isEmpty($value)) return $response->setFailure(('Invalid ' . $property['key']));
                        $this->{$property['key']} = $value;
                        break;
                    case 'MODEL_ID':
                        if (!isset($property['class'])) return $response->setFailure('Class must be set for type MODEL_ID');
                        $class_model = $property['class']::find($value);
                        if (!isset($class_model)) return $response->setFailure(('Invalid ' . $property['key']));
                        $this->{$property['key']} = $value;
                        break;
                    case 'ENUM': 
                        if (!isset($property['options'])) return $response->setFailure('Options must be set for type ENUM');
                        if (!in_array($value, $property['options'])) return $response->setFailure(('Invalid ' . $property['key']));
                        $this->{$property['key']} = $value;
                        break;
                    case 'BOOLEAN':
                        $this->{$property['key']} = Validator::validateBoolean($value);
                        break;
                    case 'INTEGER':
                        $value = (int) $value;
                        if (isset($property['min']) && $value < $property['min']) return $response->setFailure(('Value is below minimum - ' . $property['key']));
                        if (isset($property['max']) && $value > $property['max']) return $response->setFailure(('Value is above maximum - ' . $property['key']));
                        $this->{$property['key']} = $value;
                        break;
                    case 'FLOAT':
                        $value = (float) $value;
                        if (isset($property['min']) && $value < $property['min']) return $response->setFailure(('Value is below minimum - ' . $property['key']));
                        if (isset($property['max']) && $value > $property['max']) return $response->setFailure(('Value is above maximum - ' . $property['key']));
                        $this->{$property['key']} = $value;
                        break;
                    default:
                        return $response->setFailure('Type not implemented ' . $property['type'] . ' for ' . $property['key']);
                }
            }
        }


        // save the model
        $this->save();
        $response->set('model', $this);

        // return success
        return $response->setSuccess();
    }
}
