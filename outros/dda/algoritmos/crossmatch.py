import numpy as np

def hms2dec(hours, minutes, seconds):
  '''
  Function to convert HMS format to decimal degrees.

  Example usage:
  ```python
    degrees = hms2dec(2, 1, 5)
    print(degrees)
    >>> 30.270833333333336
  ```
  '''
  return 15*(hours + (minutes + seconds / 60) / 60)

def dms2dec(degrees, arc_minutes, arc_seconds):
  '''
  Function to convert DMS format to decimal degrees.

  Example usage:
  ```python
    degrees = dms2dec(-2, 1, 5)
    print(degrees)
    >>> -2.0180555555555557
  ```
  '''
  signal = abs(degrees)/degrees
  return signal * (abs(degrees) + (arc_minutes + arc_seconds / 60) / 60)

def haversine(teta):
  '''
  Return the haversine of an angle in radians.
  More info:
  https://en.wikipedia.org/wiki/Haversine_formula
  '''
  return (1 - np.cos(teta)) / 2

def angular_distance(first_ra, first_dec, second_ra, second_dec):
  '''
  Function that return the angular distance between two objects.
  This function uses the haversine formula for great-circle distance,
  More information about the formula can be found in this link:
  https://en.wikipedia.org/wiki/Haversine_formula

  Example usage:
  ```python
    distance = angular_distance(10.3, -3, 24.3, -29)
    print(distance)
    >>> 29.208498180546588
  ```
  '''
  lambda_1 = np.radians(first_ra)
  lambda_2 = np.radians(second_ra)
  phi_1    = np.radians(first_dec)
  phi_2    = np.radians(second_dec)

  a = haversine(phi_1 - phi_2)
  b = haversine(lambda_1 - lambda_2) * np.cos(phi_1) * np.cos(phi_2)

  distance = 2 * np.arcsin(np.sqrt(a + b))

  return np.degrees(distance)

def find_closest(cat, RA, dec):
  '''
  Function to find the closest object in a catalogue given
  its RA and dec both in radians.

  Complexity: O(n)
  '''
  closest = (1, angular_distance(cat[0][1], cat[0][2], RA, dec))
  
  for idx, obj in enumerate(cat, 1):
    dist = angular_distance(obj[1], obj[2], RA, dec)
    if dist < closest[1]:
      closest = (idx, dist)
  
  return closest

def crossmatch(cat_1, cat_2, max_dist):
  '''
  Function that naively crossmatches two catalogues in this format: (ID, RA, dec)
  RA and dec are in radians.

  Complexity: O(N x M), N and M are the size of the catalogues
  '''
  matches = []
  no_matches = []
  for obj in cat_1:
    closest = find_closest(cat_2, obj[1], obj[2])
    if closest[1] < max_dist:
      matches.append((obj[0], closest[0], closest[1]))
    else:
      no_matches.append(obj[0])
  
  return matches, no_matches

if __name__ == '__main__':
  print("Running tests:")
  print("Running: degrees = hms2dec(2, 1, 5)")
  degrees = hms2dec(2, 1, 5)
  print("degrees = ", degrees)
  print("Running: degrees = dms2dec(-2, 1, 5)")
  degrees = dms2dec(-2, 1, 5)
  print("degrees = ", degrees)
  print("Running: distance = angular_distance(10.3, -3, 24.3, -29)")
  distance = angular_distance(10.3, -3, 24.3, -29)
  print("distance = ", distance)