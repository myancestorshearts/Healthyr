<?php

/**
 * This file is part of FPDI
 *
 * @package   App\Libraries\FPDI
 * @copyright Copyright (c) 2020 Setasign GmbH & Co. KG (https://www.setasign.com)
 * @license   http://opensource.org/licenses/mit-license The MIT License
 */

namespace App\Libraries\FPDI;

/**
 * Class FpdfTpl
 *
 * This class adds a templating feature to FPDF.
 */
class FpdfTpl extends \App\Libraries\FPDF\FPDF
{
    use FpdfTplTrait;
}
