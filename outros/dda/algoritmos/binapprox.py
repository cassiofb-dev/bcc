import numpy as np
from astropy.io import fits

def binapprox(values, bins_number):
  """
  Function that impliments binapprox algorithm to calculate
  the median. values is the list/array of numbers and bins_number
  is the number of bins desired, check more in this link:
  https://www.stat.cmu.edu/~ryantibs/papers/median.pdf

  Example usage:
  ```python
    median = binapprox([1, 5, 7, 7, 3, 6, 1, 1], 4)
    print(median)
    >>> 4.50544503130725
  ```
  Space: O(1) | Time:  O(n), 3 passes through the data worst case
  """

  mean    = np.mean(values)
  std_dev = np.std(values)

  lower_bound = mean - std_dev
  upper_bound = mean + std_dev

  ignore_bin = 0
  bin_width  = 2 * std_dev / bins_number
  bin_array  = np.zeros(bins_number)

  for value in values:
    if value < lower_bound:
      ignore_bin += 1
    elif value < upper_bound:
      bin_index = int((value - upper_bound) / bin_width)
      bin_array[bin_index] += 1
  
  size   = len(values)
  middle = (size + 1) / 2
  count  = ignore_bin

  for bin_index, bin_value in enumerate(bin_array):
    count += bin_value
    if count >= middle:
      break
  
  median = mean - std_dev + bin_width * (bin_index + 0.5)
  return median

def welford(filenames):
  '''Calculates the running mean and stdev for a list of FITS files using Welford's method.'''
  file_number = 0
  for filename in filenames:
    hdulist = fits.open(filename)
    data = hdulist[0].data
    if file_number == 0:
      mean    = np.zeros_like(data)
      std_dev = np.zeros_like(data)

    file_number += 1

    delta    = data  - mean
    mean    += delta / file_number
    std_dev += delta * (data - mean)
    hdulist.close()

  std_dev /= file_number - 1
  np.sqrt(std_dev, std_dev)

  if file_number < 2:
    return mean, None
  else:
    return mean, std_dev

def fits_binapprox(filenames, bins_number):
  """
  Implementation of the binapprox algorithm in images
  on FITS file

  Example usage:
  ```python
    median, mean, std_dev = fits_binapprox(['image0.fits', 'image1.fits', 'image2.fits'], 5)
    print(median[100][100])
    >>> 0.018398113548755646
  ```
  """
  mean, std_dev = welford(filenames)

  lower_bound = mean - std_dev
  upper_bound = mean + std_dev

  dimension  = mean.shape
  ignore_bin = np.zeros(dimension)
  bin_array  = np.zeros((dimension[0], dimension[1], bins_number))
  bin_width  = 2 * std_dev / bins_number

  for filename in filenames:
    hdulist = fits.open(filename)
    data    = hdulist[0].data

    for i in range(dimension[0]):
      for j in range(dimension[1]):
        pixel_value = data[i, j]
        pixel_lower = lower_bound[i, j]
        pixel_upper = upper_bound[i, j]

        if pixel_value < pixel_lower:
          ignore_bin[i, j] += 1
        elif pixel_value < pixel_upper:
          bin_index = int((pixel_value - pixel_lower) / bin_width[i, j])
          bin_array[i, j, bin_index] += 1
    
    hdulist.close()
  
  size   = len(filenames)
  middle = (size + 1) / 2
  median = np.zeros(dimension)

  for i in range(dimension[0]):
    for j in range(dimension[1]):
      count = ignore_bin[i, j]
      for bin_index, bin_value in enumerate(bin_array[i, j]):
        count += bin_value
        if count >= middle:
          break
      median[i, j] = lower_bound[i, j] + bin_width[i, j] * (bin_index + 0.5)
  
  return median, mean, std_dev