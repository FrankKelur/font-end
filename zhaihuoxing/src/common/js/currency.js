var currencyArr = [
  {key: 'AED', label: '?.?'},
  {key: 'AFN', label: 'Af'},
  {key: 'ALL', label: 'L'},
  {key: 'AMD', label: '?'},
  {key: 'AOA', label: 'Kz'},
  {key: 'ARS', label: '$'},
  {key: 'AUD', label: '$'},
  {key: 'AWG', label: '?'},
  {key: 'AZN', label: 'ман'},
  {key: 'BAM', label: 'КМ'},
  {key: 'BBD', label: '$'},
  {key: 'BDT', label: '?'},
  {key: 'BGN', label: 'лв'},
  {key: 'BHD', label: '?.?'},
  {key: 'BIF', label: '?'},
  {key: 'BMD', label: '$'},
  {key: 'BND', label: '$'},
  {key: 'BOB', label: 'Bs.'},
  {key: 'BRL', label: 'R$'},
  {key: 'BSD', label: '$'},
  {key: 'BTN', label: '暂无'},
  {key: 'BWP', label: 'P'},
  {key: 'BYR', label: 'Br'},
  {key: 'BZD', label: '$'},
  {key: 'CAD', label: '$'},
  {key: 'CDF', label: '?'},
  {key: 'CHF', label: '?'},
  {key: 'CLP', label: '$'},
  {key: 'CNY', label: '￥'},
  {key: 'COP', label: '$'},
  {key: 'CRC', label: '?'},
  {key: 'CUP', label: '$'},
  {key: 'CVE', label: '$'},
  {key: 'CZK', label: 'K?'},
  {key: 'DJF', label: '?'},
  {key: 'DKK', label: 'kr'},
  {key: 'DOP', label: '$'},
  {key: 'DZD', label: '?.?'},
  {key: 'EGP', label: '￡'},
  {key: 'ERN', label: 'Nfk'},
  {key: 'ETB', label: '暂无'},
  {key: 'EUR', label: '€'},
  {key: 'FJD', label: '$'},
  {key: 'FKP', label: '￡'},
  {key: 'GBP', label: '￡'},
  {key: 'GEL', label: '?'},
  {key: 'GHS', label: '?'},
  {key: 'GIP', label: '￡'},
  {key: 'GMD', label: 'D'},
  {key: 'GNF', label: '?'},
  {key: 'GTQ', label: 'Q'},
  {key: 'GYD', label: '$'},
  {key: 'HKD', label: '$'},
  {key: 'HNL', label: 'L'},
  {key: 'HRK', label: 'Kn'},
  {key: 'HTG', label: 'G'},
  {key: 'HUF', label: 'Ft'},
  {key: 'IDR', label: 'Rp'},
  {key: 'ILS', label: '?'},
  {key: 'INR', label: '?'},
  {key: 'IQD', label: '?.?'},
  {key: 'IRR', label: '?'},
  {key: 'ISK', label: 'Kr'},
  {key: 'JMD', label: '$'},
  {key: 'JOD', label: '?.?'},
  {key: 'JPY', label: '￥'},
  {key: 'KES', label: 'Sh'},
  {key: 'KGS', label: '暂无'},
  {key: 'KHR', label: '?'},
  {key: 'KPW', label: '?'},
  {key: 'KRW', label: '?'},
  {key: 'KWD', label: '?.?'},
  {key: 'KYD', label: '$'},
  {key: 'KZT', label: '〒'},
  {key: 'LAK', label: '?'},
  {key: 'LBP', label: '?.?'},
  {key: 'LKR', label: 'Rs'},
  {key: 'LRD', label: '$'},
  {key: 'LSL', label: 'L'},
  {key: 'LYD', label: '?.?'},
  {key: 'MAD', label: '?.?.'},
  {key: 'MDL', label: 'L'},
  {key: 'MGA', label: '暂无'},
  {key: 'MKD', label: 'ден'},
  {key: 'MMK', label: 'K'},
  {key: 'MNT', label: '?'},
  {key: 'MOP', label: 'P'},
  {key: 'MRO', label: 'UM'},
  {key: 'MUR', label: '?'},
  {key: 'MVR', label: '?.'},
  {key: 'MWK', label: 'MK'},
  {key: 'MXN', label: '$'},
  {key: 'MYR', label: 'RM'},
  {key: 'MZN', label: 'MTn'},
  {key: 'NAD', label: '$'},
  {key: 'NGN', label: '?'},
  {key: 'NIO', label: 'C$'},
  {key: 'NOK', label: 'kr'},
  {key: 'NPR', label: '?'},
  {key: 'NZD', label: '$'},
  {key: 'OMR', label: '?.?.'},
  {key: 'PAB', label: 'B/.'},
  {key: 'PEN', label: 'S/.'},
  {key: 'PGK', label: 'K'},
  {key: 'PHP', label: '?'},
  {key: 'PKR', label: '?'},
  {key: 'PLN', label: 'z?'},
  {key: 'PYG', label: '?'},
  {key: 'QAR', label: '?.?'},
  {key: 'RON', label: 'L'},
  {key: 'RSD', label: 'din'},
  {key: 'RUB', label: 'р.'},
  {key: 'RWF', label: '?'},
  {key: 'SAR', label: '?.?'},
  {key: 'SBD', label: '$'},
  {key: 'SCR', label: '?'},
  {key: 'SDG', label: '￡'},
  {key: 'SEK', label: 'kr'},
  {key: 'SGD', label: '$'},
  {key: 'SHP', label: '￡'},
  {key: 'SLL', label: 'Le'},
  {key: 'SOS', label: 'Sh'},
  {key: 'SRD', label: '$'},
  {key: 'STD', label: 'Db'},
  {key: 'SYP', label: '?.?'},
  {key: 'SZL', label: 'L'},
  {key: 'THB', label: '?'},
  {key: 'TJS', label: '?М'},
  {key: 'TMT', label: 'm'},
  {key: 'TND', label: '?.?'},
  {key: 'TOP', label: 'T$'},
  {key: 'TRY', label: '?'},
  {key: 'TTD', label: '$'},
  {key: 'TWD', label: '$'},
  {key: 'TZS', label: 'Sh'},
  {key: 'UAH', label: '?'},
  {key: 'UGX', label: 'Sh'},
  {key: 'USD', label: '$'},
  {key: 'UYU', label: '$'},
  {key: 'UZS', label: '暂无'},
  {key: 'VEF', label: 'BsF'},
  {key: 'VND', label: '?'},
  {key: 'VUV', label: 'Vt'},
  {key: 'WST', label: 'T'},
  {key: 'XAF', label: '?'},
  {key: 'XCD', label: '$'},
  {key: 'XPF', label: '?'},
  {key: 'YER', label: '?'},
  {key: 'ZAR', label: 'R'},
  {key: 'ZMW', label: 'ZK'},
  {key: 'ZWL', label: '$'}
]
export default currencyArr
