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
 * Interface for filters
 */
interface FilterInterface
{
    /**
     * Decode a string.
     *
     * @param string $data The input string
     * @return string
     */
    public function decode($data);
}
