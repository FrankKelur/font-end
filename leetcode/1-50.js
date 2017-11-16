/*
1. Two Sum

  Given an array of integers, return indices of the two numbers such that they add up to a specific target.

  You may assume that each input would have exactly one solution, and you may not use the same element twice.

  Example:
  Given nums = [2, 7, 11, 15], target = 9,

  Because nums[0] + nums[1] = 2 + 7 = 9,
  return [0, 1].
 */

function twoSum (arr, target) {
  for (var i in arr) {
    var left = target - arr[i]
    var js = i + 1
    for (j in arr) {
      if (left === arr[j])
        return [i, j]
    }
  }
}

var res1 = twoSum([2, 7, 11, 15], 17)
console.log('1', res1)

/*
2. Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

  You may assume the two numbers do not contain any leading zero, except the number 0 itself.

  Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8*/
function addTowNum (a1, a2) {
  var carry = 0
  var res = []
  for (var i = 0; i < a1.length; i++) {
    var tmp = a1[i] + a2[i] + carry
    res[i] = tmp % 10
    carry = tmp >= 10 ? 1 : 0
  }
  if (carry) {
    res.push(carry)
  }
  return res
}

var a1 = [2, 4, 3]
var a2 = [5, 6, 4]
var res2 = addTowNum(a1, a2)
console.log('2', res2)

function longestSubstring (a) {
  var target = ''
  for (var i = 0; i < a.length; i++) {
    for (var j = i; j < a.length; j++) {
      var pre = a.substring(i, j)
      if (pre.indexOf(a.charAt(j)) == -1) {
        if (target.length < pre.length + 1) {
          target = pre + a.charAt(j)
        }
      } else {
        break
      }
    }

  }
  console.log(target)
  return target
}

longestSubstring('bbbbb')

/*

4. Median of Two Sorted Arrays
There are two sorted arrays nums1 and nums2 of size m and n respectively.
Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
*/
function findKTh (k, sList, lList) {
  var temp = []
  if (sList.length > lList.length) {
    temp = sList
    sList = lList
    lList = temp
  }
  if (sList < 1) {
    return lList[k]
  }
  if (k === 1) {
    return Math.min(sList[0], lList[0])
  }
  var p = Math.min(k / 2, sList.length)
  var q = k - p
  if (sList[p] < lList[q]) {
    findKTh(k - p, sList.slice(p + 1), lList.slice(0, q))
  } else {
    findKTh(k - q, sList.slice(q), lList.slice(0, p))
  }
}

/*

5. Longest Palindromic Substring
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
*/
function getPalindromicStr (str) {
  var res = ''
  for (var i = 0; i < str.length; i++) {
    var tmp = getPalindromicStrOfChar(str, i)
    if (tmp.length > res.length) {
      res = tmp
    }
  }
  return res

  function getPalindromicStrOfChar (str, idx) {
    var res = str.charAt(idx)
    for (var i = 1; ; i++) {
      var preIdx = idx - i
      var nextIdx = idx + i
      var pre = str.charAt(preIdx)
      var next = str.charAt(nextIdx)
      var curr = str.charAt(idx)
      if (preIdx === -1 || nextIdx === str.length || pre !== next) {
        if (res === pre || res === next) {
          res = res + res
        }
        break
      }
      res = pre + res + next
    }
    return res
  }
}

getPalindromicStr('babad')

/*

10. Regular Expression Matching

Implement regular expression matching with support for '.' and '*'.

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

  The matching should cover the entire input string (not partial).

The function prototype should be:
  bool isMatch(const char *s, const char *p)

Some examples:
  isMatch("aa","a") → false
isMatch("aa","aa") → true
isMatch("aaa","aa") → false
isMatch("aa", "a*") → true
isMatch("aa", ".*") → true
isMatch("ab", ".*") → true
isMatch("aab", "c*a*b") → true
*/
function isMatch (s, p) {
  if (s == '') {
    return (p.length == 2 && p.charAt(1) === '*') || p == s
  }
  var pArr = []
  var restP = p
  var j = 0
  while (true) {
    var i = restP.indexOf('*')
    if (i == -1) break
    console.log('restP', restP)
    var tmp = restP.substring(0, i + 1)
    if (tmp.length > 2) {
      for (var k = 0; k < tmp.length - 2; k++) {
        pArr[j++] = tmp.charAt(k)
      }
    }
    pArr[j++] = tmp.substring(i - 1, i + 1)
    restP = restP.substring(i + 1)
  }
  for (var m = 0; m < restP.length; m++) {
    pArr[j++] = restP.charAt(m)
  }
  console.log('pArr', pArr)
  var i = 0, j = 0, res = true
  while (true) {
    var target = s.charAt(i)
    var pattern = pArr[j]
    if ((!pattern && target) || (pattern && pattern.length != 2 && !target)) {
      res = false
      break
    } else if (!pattern || !target) {
      break
    }
    if (equal(target, pattern)) {
      i++
      if (pattern.length == 1) { // 不包括*
        j++
      }
    } else {
      if (pattern.length == 1) { // 不包括*
        res = false
        break
      } else {
        j++
      }
    }
  }

  return res

  function equal (target, pattern) {
    var c = pattern.charAt(0)
    if (c === '.' || c === target) {
      return true
    }
    return false
  }
}

// console.log("isMatch(\"aa\",\"a\")", isMatch("aa","a"))
// console.log("isMatch(\"aa\",\"aa\")", isMatch("aa","aa"))
// console.log("isMatch(\"aaa\",\"aa\")", isMatch("aaa","aa"))
// console.log("isMatch(\"aa\", \"a*\")", isMatch("aa", "a*"))
// console.log("isMatch(\"aa\", \".*\")", isMatch("aa", ".*"))
// console.log("isMatch(\"ab\", \".*\")", isMatch("ab", ".*"))
// console.log("isMatch(\"aab\", \"c*a*b\")", isMatch("aab", "c*a*b"))
console.log('isMatch(zhai*peng.*)', isMatch('zhaipengchao', 'zhai*peng.*ao'))

/*

11. Container With Most Water

Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

  Note: You may not slant the container and n is at least 2.
*/

function getMostWater (n, f) {
  var max = 0
  for (var k = 0; k < n; k++) {
    for (var m = k + 1; m < n; m++) {
      var tmp = (m - k) * Math.min(f[m], f[k])
      if (tmp > max) {
        max = tmp
      }
    }
  }
  return max
}

var n = 5
var f = [2, 4, 1, 5, 8]
console.log('getMostWater(n, f): ', getMostWater(n, f))

/*
Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

  Note: The solution set must not contain duplicate triplets.

  For example, given array S = [-1, 0, 1, 2, -1, -4],

  A solution set is:
  [
    [-1, 0, 1],
    [-1, -1, 2]
  ]
*/

function threeSum (arr) {
  var set = new Set()
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      for (var k = j + 1; k < arr.length; k++) {
        var target = arr[i] + arr[j] + arr[k]
        if (target === 0) {
          var tmp = [arr[i], arr[j], arr[k]]
          if (!exist(tmp, set)) {
            set.add(tmp)
          }
        }
      }
    }
  }

  function exist (arr, set) {
    var res = false
    set.forEach(list => {
      !res && (res = list.includes(arr[0]) && list.includes(arr[1]))
    })
    return res
  }

  return set
}

console.log('threeSum([-1, 0, 1, 2, -1, -4])', threeSum([-1, 0, 1, 2, -1, -4]))

/*

17. Letter Combinations of a Phone Number

Given a digit string, return all possible letter combinations that the number could represent.

  A mapping of digit to letters (just like on the telephone buttons) is given below.

  Input:Digit string "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
  Note: Although the above answer is in lexicographical order, your answer could be in any order you want.
*/

function phoneNumberCombine (str) {
  console.log('\n\n-------')
  var map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  }
  var arr = Array.from(str)
  var matrix = arr.map(i => map[i])
  return getCombine('', matrix)

  function getCombine (item, matrix) {
    console.log('item ', item)
    if (matrix.length === 1) {
      return matrix[0].map(elm => item + elm)
    }
    var res = []
    for (var i = 0; i < matrix.length; i++)
      for (var j = 0; j < matrix[i].length; j++)
        res = res.concat(getCombine(matrix[i][j], otherMatrix(i, j, matrix)))

    return res.map(elm => item + elm)
  }

  function otherMatrix (r, col, matrix) {
    var res = Object.assign([], matrix)
    res.splice(r, 1)
    // res = res.map(row => row.slice(c, 1))
    return res
  }
}

console.log('phoneNumberCombine(\'23\')', phoneNumberCombine('23'))

function phoneNumberCombine (str) {
  console.log('\n\n-------')
  var map = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  }
  var arr = Array.from(str)
  var matrix = arr.map(i => map[i])
  return getCombine('', matrix)

  function getCombine (item, matrix) {
    console.log('item ', item)
    if (matrix.length === 1) {
      return matrix[0].map(elm => item + elm)
    }
    var res = []
    for (var j = 0; j < matrix[0].length; j++)
      res = res.concat(getCombine(matrix[0][j], otherMatrix(0, j, matrix)))

    return res.map(elm => item + elm)
  }

  function otherMatrix (r, col, matrix) {
    var res = Object.assign([], matrix)
    res.splice(r, 1)
    // res = res.map(row => row.slice(c, 1))
    return res
  }
}

console.log('phoneNumberCombine(\'23\')', phoneNumberCombine('23'))

/*

12. Integer to Roman
Given an integer, convert it to a roman numeral.

  Input is guaranteed to be within the range from 1 to 3999.
*/

var map = {
  '1': 'I',
  '5': 'V',
  '10': 'X',
  '50': 'L',
  '100': 'C',
  '500': 'D',
  '1000': 'M'
}

function getRoman (num) {
  var res = []
  var closest = getClosest(num)
  if (closest == num) {
    return [num]
  }
  if (num > closest) {
    res = [closest].concat(getRoman(num - closest))
  } else {
    res = getRoman(closest - num)
    res.push(closest)
  }
  return res

  function getClosest (num) {
    var numList = Object.keys(map)
    var gap = Infinity, res = num
    for (var i = 0; i < numList.length; i++) {
      var item = numList[i]
      if (Math.abs(num - item) < gap) {
        gap = Math.abs(num - item)
        res = item
      }
    }
    return res
  }
}

console.log('getRoman(13): ', getRoman(13).map(item => map[item]).join(',').replace(/,/ig, ''))
console.log('getRoman(14): ', getRoman(14).map(item => map[item]).join(',').replace(/,/ig, ''))
console.log('getRoman(15): ', getRoman(15).map(item => map[item]).join(',').replace(/,/ig, ''))

var mapReverse = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
}

function romanToInt (str) {
  if (str.length == 0) {
    return 0
  }
  if (str.length == 1) {
    return mapReverse[str]
  }
  var {max, left, right} = findFirstMax(str)
  return max + romanToInt(right) - romanToInt(left)

  function findFirstMax (str) {
    var romanList = Array.from(str)
    var intList = romanList.map(elm => mapReverse[elm])
    var max = intList[0], maxIdx = 0
    for (var i = 1; i < intList.length; i++) {
      if (max < intList[i]) {
        max = intList[i]
        maxIdx = i
      }
    }
    var left = str.substring(0, maxIdx)
    var right = str.substring(maxIdx + 1)
    return {max, left, right}
  }
}

console.log('romanToInt(\'XIII\')', romanToInt('XIII'))
console.log('romanToInt(\'XIV\')', romanToInt('XIV'))
console.log('romanToInt(\'XV\')', romanToInt('XV'))

/*
16. 3Sum Closest
Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

  For example, given array S = {-1 2 1 -4}, and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
*/

/*
18. 4Sum
Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

  Note: The solution set must not contain duplicate quadruplets.

  For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.

A solution set is:
  [
    [-1,  0, 0, 1],
    [-2, -1, 1, 2],
    [-2,  0, 0, 2]
  ]
*/

// Remove Nth Node From End of List
function LNode (value) {
  this.value = value
}

LNode.prototype.isTail = function () {
  return this.next === null
}
LNode.prototype.setNext = function (next) {
  this.next = next
}
LNode.prototype.toString = function () {
  return this.value
}

function removeNthList (list, n) {
  var header = init(list)
  console.log('删除前：', iterator(header))
  var count = 0
  var i = header
  while (i) {
    count++
    i = i.next
  }
  i = header
  var pre = header
  var index = 0
  while (i) {
    if (index === count - n) {
      pre.next = i.next
      break
    }
    index++
    pre = i
    i = i.next
  }
  console.log('删除后：', iterator(header))
  return i

  function init (arr) {
    var pre = null, header = null
    for (var idx = 0 ; idx < arr.length; idx++) {
      var item = arr[idx]
      var curr = new LNode(item)
      idx === 0 && (header = curr)
      pre && pre.setNext(curr)
      pre = curr
    }
    pre.setNext(null)
    return header
  }

  function iterator (header) {
    var i = header
    var res = []
    while (i) {
      res.push(i.value)
      i = i.next
    }
    return res.join('->')
  }
}

console.log('removeNthList', removeNthList([1, 2, 3, 4, 5, 6], 3))