<?php

/**
 * This file is part of FPDI
 *
 * @package   App\Libraries\FPDI
 * @copyright Copyright (c) 2020 Setasign GmbH & Co. KG (https://www.setasign.com)
 * @license   http://opensource.org/licenses/mit-license The MIT License
 */

namespace App\Libraries\FPDI\PdfParser\Filter;

/**
 * Exception for LZW filter class
 */
class LzwException extends FilterException
{
    /**
     * @var integer
     */
    const LZW_FLAVOUR_NOT_SUPPORTED = 0x0501;
}
