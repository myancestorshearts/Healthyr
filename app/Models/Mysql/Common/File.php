<?php

namespace App\Models\Mysql\Common;

use Aws\S3\S3Client;

class File extends Base
{
    public $table = 'files';

    protected $hidden = [
    ];

    const TYPE_IMAGE = 'IMAGE';
    const TYPE_PDF = 'PDF';
    const TYPE_BINARY = 'BINARY';


    public function setType() {
        $map = [
            'image/png' => File::TYPE_IMAGE,
            'image/jpg' => File::TYPE_IMAGE,
            'image/webp' => File::TYPE_IMAGE,
            'image/jpeg' => File::TYPE_IMAGE,
            'application/pdf' => File::TYPE_PDF
        ];

        if (isset($map[$this->mime_type])) $this->type = $map[$this->mime_type];
        else $this->type = File::TYPE_BINARY;
    }


    /**purpose
     *   upload file to s3
     * args
     *   file contents
     * returns
     *   true/false (result success or not)
     */
    public function upload($file_contents) {

        // create s3 client and put object to s3
        $s3_client = S3Client::factory(array(
            'credentials' => array(
                'key'    => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY')
            ),
            'region' => env('AWS_DEFAULT_REGION'),
            'version' => 'latest',
        ));
        
        // save object to s3 storage
        $s3_client->putObject(array(
            'Bucket'            => env('AWS_BUCKET'),
            'Key'               => $this->id,
            'Body'              => $file_contents
        ));
    }

    /**purpose 
     *   download a file from s3
     * args
     *   (none)
     * returns
     *   file_contents
     */
    public function download() {
        
		$s3_client = S3Client::factory(array(
			'credentials' => array(
				'key'    => env('AWS_ACCESS_KEY_ID'),
				'secret' => env('AWS_SECRET_ACCESS_KEY')
			),
			'region' => env('AWS_DEFAULT_REGION'),
			'version' => 'latest',
		));

		$file_data = $s3_client->getObject(array(
            'Bucket'            => env('AWS_BUCKET'),
            'Key'               => $this->id
        ));
        return $file_data['Body'];
    }
}
