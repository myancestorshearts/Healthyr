<?php

namespace App\Models\Mysql\Common;

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

}
