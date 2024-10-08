var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://deno.land/std@0.173.0/_util/os.ts
var osType = (() => {
  const { Deno: Deno3 } = globalThis;
  if (typeof Deno3?.build?.os === "string") {
    return Deno3.build.os;
  }
  const { navigator } = globalThis;
  if (navigator?.appVersion?.includes?.("Win")) {
    return "windows";
  }
  return "linux";
})();
var isWindows = osType === "windows";

// https://deno.land/std@0.173.0/path/win32.ts
var win32_exports = {};
__export(win32_exports, {
  basename: () => basename,
  delimiter: () => delimiter,
  dirname: () => dirname,
  extname: () => extname,
  format: () => format,
  fromFileUrl: () => fromFileUrl,
  isAbsolute: () => isAbsolute,
  join: () => join,
  normalize: () => normalize,
  parse: () => parse,
  relative: () => relative,
  resolve: () => resolve,
  sep: () => sep,
  toFileUrl: () => toFileUrl,
  toNamespacedPath: () => toNamespacedPath
});

// https://deno.land/std@0.173.0/path/_constants.ts
var CHAR_UPPERCASE_A = 65;
var CHAR_LOWERCASE_A = 97;
var CHAR_UPPERCASE_Z = 90;
var CHAR_LOWERCASE_Z = 122;
var CHAR_DOT = 46;
var CHAR_FORWARD_SLASH = 47;
var CHAR_BACKWARD_SLASH = 92;
var CHAR_COLON = 58;
var CHAR_QUESTION_MARK = 63;

// https://deno.land/std@0.173.0/path/_util.ts
function assertPath(path3) {
  if (typeof path3 !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path3)}`
    );
  }
}
function isPosixPathSeparator(code3) {
  return code3 === CHAR_FORWARD_SLASH;
}
function isPathSeparator(code3) {
  return isPosixPathSeparator(code3) || code3 === CHAR_BACKWARD_SLASH;
}
function isWindowsDeviceRoot(code3) {
  return code3 >= CHAR_LOWERCASE_A && code3 <= CHAR_LOWERCASE_Z || code3 >= CHAR_UPPERCASE_A && code3 <= CHAR_UPPERCASE_Z;
}
function normalizeString(path3, allowAboveRoot, separator, isPathSeparator2) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code3;
  for (let i = 0, len = path3.length; i <= len; ++i) {
    if (i < len) code3 = path3.charCodeAt(i);
    else if (isPathSeparator2(code3)) break;
    else code3 = CHAR_FORWARD_SLASH;
    if (isPathSeparator2(code3)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT || res.charCodeAt(res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path3.slice(lastSlash + 1, i);
        else res = path3.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code3 === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep4, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (dir === pathObject.root) return dir + base;
  return dir + sep4 + base;
}
var WHITESPACE_ENCODINGS = {
  "	": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  " ": "%20"
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}

// https://deno.land/std@0.173.0/_util/asserts.ts
var DenoStdInternalError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DenoStdInternalError";
  }
};
function assert(expr, msg = "") {
  if (!expr) {
    throw new DenoStdInternalError(msg);
  }
}

// https://deno.land/std@0.173.0/path/win32.ts
var sep = "\\";
var delimiter = ";";
function resolve(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path3;
    const { Deno: Deno3 } = globalThis;
    if (i >= 0) {
      path3 = pathSegments[i];
    } else if (!resolvedDevice) {
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path3 = Deno3.cwd();
    } else {
      if (typeof Deno3?.env?.get !== "function" || typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path3 = Deno3.cwd();
      if (path3 === void 0 || path3.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
        path3 = `${resolvedDevice}\\`;
      }
    }
    assertPath(path3);
    const len = path3.length;
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute4 = false;
    const code3 = path3.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code3)) {
        isAbsolute4 = true;
        if (isPathSeparator(path3.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) {
            if (isPathSeparator(path3.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            const firstPart = path3.slice(last, j);
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path3.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path3.charCodeAt(j))) break;
              }
              if (j === len) {
                device = `\\\\${firstPart}\\${path3.slice(last)}`;
                rootEnd = j;
              } else if (j !== last) {
                device = `\\\\${firstPart}\\${path3.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code3)) {
        if (path3.charCodeAt(1) === CHAR_COLON) {
          device = path3.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path3.charCodeAt(2))) {
              isAbsolute4 = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code3)) {
      rootEnd = 1;
      isAbsolute4 = true;
    }
    if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
      continue;
    }
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path3.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute4;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  resolvedTail = normalizeString(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path3) {
  assertPath(path3);
  const len = path3.length;
  if (len === 0) return ".";
  let rootEnd = 0;
  let device;
  let isAbsolute4 = false;
  const code3 = path3.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code3)) {
      isAbsolute4 = true;
      if (isPathSeparator(path3.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) {
          if (isPathSeparator(path3.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          const firstPart = path3.slice(last, j);
          last = j;
          for (; j < len; ++j) {
            if (!isPathSeparator(path3.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path3.charCodeAt(j))) break;
            }
            if (j === len) {
              return `\\\\${firstPart}\\${path3.slice(last)}\\`;
            } else if (j !== last) {
              device = `\\\\${firstPart}\\${path3.slice(last, j)}`;
              rootEnd = j;
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else if (isWindowsDeviceRoot(code3)) {
      if (path3.charCodeAt(1) === CHAR_COLON) {
        device = path3.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path3.charCodeAt(2))) {
            isAbsolute4 = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code3)) {
    return "\\";
  }
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(
      path3.slice(rootEnd),
      !isAbsolute4,
      "\\",
      isPathSeparator
    );
  } else {
    tail = "";
  }
  if (tail.length === 0 && !isAbsolute4) tail = ".";
  if (tail.length > 0 && isPathSeparator(path3.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === void 0) {
    if (isAbsolute4) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    } else if (tail.length > 0) {
      return tail;
    } else {
      return "";
    }
  } else if (isAbsolute4) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  } else if (tail.length > 0) {
    return device + tail;
  } else {
    return device;
  }
}
function isAbsolute(path3) {
  assertPath(path3);
  const len = path3.length;
  if (len === 0) return false;
  const code3 = path3.charCodeAt(0);
  if (isPathSeparator(code3)) {
    return true;
  } else if (isWindowsDeviceRoot(code3)) {
    if (len > 2 && path3.charCodeAt(1) === CHAR_COLON) {
      if (isPathSeparator(path3.charCodeAt(2))) return true;
    }
  }
  return false;
}
function join(...paths) {
  const pathsCount = paths.length;
  if (pathsCount === 0) return ".";
  let joined;
  let firstPart = null;
  for (let i = 0; i < pathsCount; ++i) {
    const path3 = paths[i];
    assertPath(path3);
    if (path3.length > 0) {
      if (joined === void 0) joined = firstPart = path3;
      else joined += `\\${path3}`;
    }
  }
  if (joined === void 0) return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart != null);
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    }
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize(joined);
}
function relative(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  const fromOrig = resolve(from);
  const toOrig = resolve(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return "";
  let fromStart = 0;
  let fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH) break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH) break;
  }
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) {
          return toOrig.slice(toStart + i);
        }
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
          lastCommonSep = i;
        } else if (i === 2) {
          lastCommonSep = 3;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_BACKWARD_SLASH) lastCommonSep = i;
  }
  if (i !== length && lastCommonSep === -1) {
    return toOrig;
  }
  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0;
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
      if (out.length === 0) out += "..";
      else out += "\\..";
    }
  }
  if (out.length > 0) {
    return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  } else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
function toNamespacedPath(path3) {
  if (typeof path3 !== "string") return path3;
  if (path3.length === 0) return "";
  const resolvedPath = resolve(path3);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
      if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
        const code3 = resolvedPath.charCodeAt(2);
        if (code3 !== CHAR_QUESTION_MARK && code3 !== CHAR_DOT) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      if (resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
        return `\\\\?\\${resolvedPath}`;
      }
    }
  }
  return path3;
}
function dirname(path3) {
  assertPath(path3);
  const len = path3.length;
  if (len === 0) return ".";
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code3 = path3.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code3)) {
      rootEnd = offset = 1;
      if (isPathSeparator(path3.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) {
          if (isPathSeparator(path3.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          last = j;
          for (; j < len; ++j) {
            if (!isPathSeparator(path3.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path3.charCodeAt(j))) break;
            }
            if (j === len) {
              return path3;
            }
            if (j !== last) {
              rootEnd = offset = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code3)) {
      if (path3.charCodeAt(1) === CHAR_COLON) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path3.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code3)) {
    return path3;
  }
  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator(path3.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return path3.slice(0, end);
}
function basename(path3, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path3);
  let start2 = 0;
  let end = -1;
  let matchedSlash = true;
  let i;
  if (path3.length >= 2) {
    const drive = path3.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) {
      if (path3.charCodeAt(1) === CHAR_COLON) start2 = 2;
    }
  }
  if (ext !== void 0 && ext.length > 0 && ext.length <= path3.length) {
    if (ext.length === path3.length && ext === path3) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i = path3.length - 1; i >= start2; --i) {
      const code3 = path3.charCodeAt(i);
      if (isPathSeparator(code3)) {
        if (!matchedSlash) {
          start2 = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
          end = firstNonSlashEnd;
        }
        if (extIdx >= 0) {
          if (code3 === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i;
            }
          } else {
            extIdx = -1;
          }
        }
      }
    }
    if (end === -1) return "";
    if (start2 === end) end = firstNonSlashEnd;
    return path3.slice(start2, end);
  } else {
    for (i = path3.length - 1; i >= start2; --i) {
      if (isPathSeparator(path3.charCodeAt(i))) {
        if (!matchedSlash) {
          start2 = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1) return "";
    return path3.slice(start2, end);
  }
}
function extname(path3) {
  assertPath(path3);
  let start2 = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (path3.length >= 2 && path3.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path3.charCodeAt(0))) {
    start2 = startPart = 2;
  }
  for (let i = path3.length - 1; i >= start2; --i) {
    const code3 = path3.charCodeAt(i);
    if (isPathSeparator(code3)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code3 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path3.slice(startDot, end);
}
function format(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("\\", pathObject);
}
function parse(path3) {
  assertPath(path3);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path3.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code3 = path3.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code3)) {
      rootEnd = 1;
      if (isPathSeparator(path3.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) {
          if (isPathSeparator(path3.charCodeAt(j))) break;
        }
        if (j < len && j !== last) {
          last = j;
          for (; j < len; ++j) {
            if (!isPathSeparator(path3.charCodeAt(j))) break;
          }
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) {
              if (isPathSeparator(path3.charCodeAt(j))) break;
            }
            if (j === len) {
              rootEnd = j;
            } else if (j !== last) {
              rootEnd = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code3)) {
      if (path3.charCodeAt(1) === CHAR_COLON) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path3.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path3;
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path3;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code3)) {
    ret.root = ret.dir = path3;
    return ret;
  }
  if (rootEnd > 0) ret.root = path3.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path3.length - 1;
  let preDotState = 0;
  for (; i >= rootEnd; --i) {
    code3 = path3.charCodeAt(i);
    if (isPathSeparator(code3)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code3 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      ret.base = ret.name = path3.slice(startPart, end);
    }
  } else {
    ret.name = path3.slice(startPart, startDot);
    ret.base = path3.slice(startPart, end);
    ret.ext = path3.slice(startDot, end);
  }
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path3.slice(0, startPart - 1);
  } else ret.dir = ret.root;
  return ret;
}
function fromFileUrl(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  let path3 = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname != "") {
    path3 = `\\\\${url.hostname}${path3}`;
  }
  return path3;
}
function toFileUrl(path3) {
  if (!isAbsolute(path3)) {
    throw new TypeError("Must be an absolute path.");
  }
  const [, hostname, pathname] = path3.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname != null && hostname != "localhost") {
    url.hostname = hostname;
    if (!url.hostname) {
      throw new TypeError("Invalid hostname.");
    }
  }
  return url;
}

// https://deno.land/std@0.173.0/path/posix.ts
var posix_exports = {};
__export(posix_exports, {
  basename: () => basename2,
  delimiter: () => delimiter2,
  dirname: () => dirname2,
  extname: () => extname2,
  format: () => format2,
  fromFileUrl: () => fromFileUrl2,
  isAbsolute: () => isAbsolute2,
  join: () => join2,
  normalize: () => normalize2,
  parse: () => parse2,
  relative: () => relative2,
  resolve: () => resolve2,
  sep: () => sep2,
  toFileUrl: () => toFileUrl2,
  toNamespacedPath: () => toNamespacedPath2
});
var sep2 = "/";
var delimiter2 = ":";
function resolve2(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path3;
    if (i >= 0) path3 = pathSegments[i];
    else {
      const { Deno: Deno3 } = globalThis;
      if (typeof Deno3?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path3 = Deno3.cwd();
    }
    assertPath(path3);
    if (path3.length === 0) {
      continue;
    }
    resolvedPath = `${path3}/${resolvedPath}`;
    resolvedAbsolute = path3.charCodeAt(0) === CHAR_FORWARD_SLASH;
  }
  resolvedPath = normalizeString(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}
function normalize2(path3) {
  assertPath(path3);
  if (path3.length === 0) return ".";
  const isAbsolute4 = path3.charCodeAt(0) === CHAR_FORWARD_SLASH;
  const trailingSeparator = path3.charCodeAt(path3.length - 1) === CHAR_FORWARD_SLASH;
  path3 = normalizeString(path3, !isAbsolute4, "/", isPosixPathSeparator);
  if (path3.length === 0 && !isAbsolute4) path3 = ".";
  if (path3.length > 0 && trailingSeparator) path3 += "/";
  if (isAbsolute4) return `/${path3}`;
  return path3;
}
function isAbsolute2(path3) {
  assertPath(path3);
  return path3.length > 0 && path3.charCodeAt(0) === CHAR_FORWARD_SLASH;
}
function join2(...paths) {
  if (paths.length === 0) return ".";
  let joined;
  for (let i = 0, len = paths.length; i < len; ++i) {
    const path3 = paths[i];
    assertPath(path3);
    if (path3.length > 0) {
      if (!joined) joined = path3;
      else joined += `/${path3}`;
    }
  }
  if (!joined) return ".";
  return normalize2(joined);
}
function relative2(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
  from = resolve2(from);
  to = resolve2(to);
  if (from === to) return "";
  let fromStart = 1;
  const fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
          return to.slice(toStart + i + 1);
        } else if (i === 0) {
          return to.slice(toStart + i);
        }
      } else if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
          lastCommonSep = i;
        } else if (i === 0) {
          lastCommonSep = 0;
        }
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (fromCode === CHAR_FORWARD_SLASH) lastCommonSep = i;
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      if (out.length === 0) out += "..";
      else out += "/..";
    }
  }
  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) ++toStart;
    return to.slice(toStart);
  }
}
function toNamespacedPath2(path3) {
  return path3;
}
function dirname2(path3) {
  assertPath(path3);
  if (path3.length === 0) return ".";
  const hasRoot = path3.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let end = -1;
  let matchedSlash = true;
  for (let i = path3.length - 1; i >= 1; --i) {
    if (path3.charCodeAt(i) === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1) return hasRoot ? "/" : ".";
  if (hasRoot && end === 1) return "//";
  return path3.slice(0, end);
}
function basename2(path3, ext = "") {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path3);
  let start2 = 0;
  let end = -1;
  let matchedSlash = true;
  let i;
  if (ext !== void 0 && ext.length > 0 && ext.length <= path3.length) {
    if (ext.length === path3.length && ext === path3) return "";
    let extIdx = ext.length - 1;
    let firstNonSlashEnd = -1;
    for (i = path3.length - 1; i >= 0; --i) {
      const code3 = path3.charCodeAt(i);
      if (isPosixPathSeparator(code3)) {
        if (!matchedSlash) {
          start2 = i + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd === -1) {
          matchedSlash = false;
          firstNonSlashEnd = i + 1;
          end = firstNonSlashEnd;
        }
        if (extIdx >= 0) {
          if (code3 === ext.charCodeAt(extIdx)) {
            if (--extIdx === -1) {
              end = i;
            }
          } else {
            extIdx = -1;
          }
        }
      }
    }
    if (end === -1) return "";
    if (start2 === end) end = firstNonSlashEnd;
    return path3.slice(start2, end);
  } else {
    for (i = path3.length - 1; i >= 0; --i) {
      if (isPosixPathSeparator(path3.charCodeAt(i))) {
        if (!matchedSlash) {
          start2 = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1) return "";
    return path3.slice(start2, end);
  }
}
function extname2(path3) {
  assertPath(path3);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i = path3.length - 1; i >= 0; --i) {
    const code3 = path3.charCodeAt(i);
    if (code3 === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code3 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path3.slice(startDot, end);
}
function format2(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`
    );
  }
  return _format("/", pathObject);
}
function parse2(path3) {
  assertPath(path3);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path3.length === 0) return ret;
  const isAbsolute4 = path3.charCodeAt(0) === CHAR_FORWARD_SLASH;
  let start2;
  if (isAbsolute4) {
    ret.root = "/";
    start2 = 1;
  } else {
    start2 = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path3.length - 1;
  let preDotState = 0;
  for (; i >= start2; --i) {
    const code3 = path3.charCodeAt(i);
    if (code3 === CHAR_FORWARD_SLASH) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code3 === CHAR_DOT) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
  preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute4) {
        ret.base = ret.name = path3.slice(1, end);
      } else {
        ret.base = ret.name = path3.slice(startPart, end);
      }
    }
  } else {
    if (startPart === 0 && isAbsolute4) {
      ret.name = path3.slice(1, startDot);
      ret.base = path3.slice(1, end);
    } else {
      ret.name = path3.slice(startPart, startDot);
      ret.base = path3.slice(startPart, end);
    }
    ret.ext = path3.slice(startDot, end);
  }
  if (startPart > 0) ret.dir = path3.slice(0, startPart - 1);
  else if (isAbsolute4) ret.dir = "/";
  return ret;
}
function fromFileUrl2(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol != "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25")
  );
}
function toFileUrl2(path3) {
  if (!isAbsolute2(path3)) {
    throw new TypeError("Must be an absolute path.");
  }
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path3.replace(/%/g, "%25").replace(/\\/g, "%5C")
  );
  return url;
}

// https://deno.land/std@0.173.0/path/glob.ts
var path = isWindows ? win32_exports : posix_exports;
var { join: join3, normalize: normalize3 } = path;

// https://deno.land/std@0.173.0/path/mod.ts
var path2 = isWindows ? win32_exports : posix_exports;
var {
  basename: basename3,
  delimiter: delimiter3,
  dirname: dirname3,
  extname: extname3,
  format: format3,
  fromFileUrl: fromFileUrl3,
  isAbsolute: isAbsolute3,
  join: join4,
  normalize: normalize4,
  parse: parse3,
  relative: relative3,
  resolve: resolve3,
  sep: sep3,
  toFileUrl: toFileUrl3,
  toNamespacedPath: toNamespacedPath3
} = path2;

// https://deno.land/std@0.173.0/fs/_util.ts
function getFileInfoType(fileInfo) {
  return fileInfo.isFile ? "file" : fileInfo.isDirectory ? "dir" : fileInfo.isSymlink ? "symlink" : void 0;
}

// https://deno.land/std@0.173.0/fs/ensure_dir.ts
async function ensureDir(dir) {
  try {
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${getFileInfoType(fileInfo)}'`
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      await Deno.mkdir(dir, { recursive: true });
      return;
    }
    throw err;
  }
}

// https://deno.land/std@0.173.0/fs/move.ts
var EXISTS_ERROR = new Deno.errors.AlreadyExists("dest already exists.");

// https://deno.land/std@0.173.0/encoding/hex.ts
var hexTable = new TextEncoder().encode("0123456789abcdef");
function encode(src) {
  const dst = new Uint8Array(src.length * 2);
  for (let i = 0; i < dst.length; i++) {
    const v = src[i];
    dst[i * 2] = hexTable[v >> 4];
    dst[i * 2 + 1] = hexTable[v & 15];
  }
  return dst;
}

// https://deno.land/std@0.173.0/fmt/colors.ts
var colors_exports = {};
__export(colors_exports, {
  bgBlack: () => bgBlack,
  bgBlue: () => bgBlue,
  bgBrightBlack: () => bgBrightBlack,
  bgBrightBlue: () => bgBrightBlue,
  bgBrightCyan: () => bgBrightCyan,
  bgBrightGreen: () => bgBrightGreen,
  bgBrightMagenta: () => bgBrightMagenta,
  bgBrightRed: () => bgBrightRed,
  bgBrightWhite: () => bgBrightWhite,
  bgBrightYellow: () => bgBrightYellow,
  bgCyan: () => bgCyan,
  bgGreen: () => bgGreen,
  bgMagenta: () => bgMagenta,
  bgRed: () => bgRed,
  bgRgb24: () => bgRgb24,
  bgRgb8: () => bgRgb8,
  bgWhite: () => bgWhite,
  bgYellow: () => bgYellow,
  black: () => black,
  blue: () => blue,
  bold: () => bold,
  brightBlack: () => brightBlack,
  brightBlue: () => brightBlue,
  brightCyan: () => brightCyan,
  brightGreen: () => brightGreen,
  brightMagenta: () => brightMagenta,
  brightRed: () => brightRed,
  brightWhite: () => brightWhite,
  brightYellow: () => brightYellow,
  cyan: () => cyan,
  dim: () => dim,
  getColorEnabled: () => getColorEnabled,
  gray: () => gray,
  green: () => green,
  hidden: () => hidden,
  inverse: () => inverse,
  italic: () => italic,
  magenta: () => magenta,
  red: () => red,
  reset: () => reset,
  rgb24: () => rgb24,
  rgb8: () => rgb8,
  setColorEnabled: () => setColorEnabled,
  strikethrough: () => strikethrough,
  stripColor: () => stripColor,
  underline: () => underline,
  white: () => white,
  yellow: () => yellow
});
var { Deno: Deno2 } = globalThis;
var noColor = typeof Deno2?.noColor === "boolean" ? Deno2.noColor : true;
var enabled = !noColor;
function setColorEnabled(value) {
  if (noColor) {
    return;
  }
  enabled = value;
}
function getColorEnabled() {
  return enabled;
}
function code(open, close) {
  return {
    open: `\x1B[${open.join(";")}m`,
    close: `\x1B[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
function run(str, code3) {
  return enabled ? `${code3.open}${str.replace(code3.regexp, code3.open)}${code3.close}` : str;
}
function reset(str) {
  return run(str, code([0], 0));
}
function bold(str) {
  return run(str, code([1], 22));
}
function dim(str) {
  return run(str, code([2], 22));
}
function italic(str) {
  return run(str, code([3], 23));
}
function underline(str) {
  return run(str, code([4], 24));
}
function inverse(str) {
  return run(str, code([7], 27));
}
function hidden(str) {
  return run(str, code([8], 28));
}
function strikethrough(str) {
  return run(str, code([9], 29));
}
function black(str) {
  return run(str, code([30], 39));
}
function red(str) {
  return run(str, code([31], 39));
}
function green(str) {
  return run(str, code([32], 39));
}
function yellow(str) {
  return run(str, code([33], 39));
}
function blue(str) {
  return run(str, code([34], 39));
}
function magenta(str) {
  return run(str, code([35], 39));
}
function cyan(str) {
  return run(str, code([36], 39));
}
function white(str) {
  return run(str, code([37], 39));
}
function gray(str) {
  return brightBlack(str);
}
function brightBlack(str) {
  return run(str, code([90], 39));
}
function brightRed(str) {
  return run(str, code([91], 39));
}
function brightGreen(str) {
  return run(str, code([92], 39));
}
function brightYellow(str) {
  return run(str, code([93], 39));
}
function brightBlue(str) {
  return run(str, code([94], 39));
}
function brightMagenta(str) {
  return run(str, code([95], 39));
}
function brightCyan(str) {
  return run(str, code([96], 39));
}
function brightWhite(str) {
  return run(str, code([97], 39));
}
function bgBlack(str) {
  return run(str, code([40], 49));
}
function bgRed(str) {
  return run(str, code([41], 49));
}
function bgGreen(str) {
  return run(str, code([42], 49));
}
function bgYellow(str) {
  return run(str, code([43], 49));
}
function bgBlue(str) {
  return run(str, code([44], 49));
}
function bgMagenta(str) {
  return run(str, code([45], 49));
}
function bgCyan(str) {
  return run(str, code([46], 49));
}
function bgWhite(str) {
  return run(str, code([47], 49));
}
function bgBrightBlack(str) {
  return run(str, code([100], 49));
}
function bgBrightRed(str) {
  return run(str, code([101], 49));
}
function bgBrightGreen(str) {
  return run(str, code([102], 49));
}
function bgBrightYellow(str) {
  return run(str, code([103], 49));
}
function bgBrightBlue(str) {
  return run(str, code([104], 49));
}
function bgBrightMagenta(str) {
  return run(str, code([105], 49));
}
function bgBrightCyan(str) {
  return run(str, code([106], 49));
}
function bgBrightWhite(str) {
  return run(str, code([107], 49));
}
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
  return run(str, code([38, 5, clampAndTruncate(color)], 39));
}
function bgRgb8(str, color) {
  return run(str, code([48, 5, clampAndTruncate(color)], 49));
}
function rgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [38, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        39
      )
    );
  }
  return run(
    str,
    code(
      [
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      39
    )
  );
}
function bgRgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [48, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        49
      )
    );
  }
  return run(
    str,
    code(
      [
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      49
    )
  );
}
var ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
  ].join("|"),
  "g"
);
function stripColor(string) {
  return string.replace(ANSI_PATTERN, "");
}

// https://deno.land/x/plug@1.0.0/util.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function baseUrlToFilename(url) {
  const out = [];
  const protocol = url.protocol.replace(":", "");
  out.push(protocol);
  switch (protocol) {
    case "http":
    case "https": {
      const host = url.hostname;
      const hostPort = url.port;
      out.push(hostPort ? `${host}_PORT${hostPort}` : host);
      break;
    }
    case "file":
    case "data":
    case "blob":
      break;
    default:
      throw new TypeError(
        `Don't know how to create cache name for protocol: ${protocol}`
      );
  }
  return join4(...out);
}
function stringToURL(url) {
  return url.startsWith("file://") || url.startsWith("http://") || url.startsWith("https://") ? new URL(url) : toFileUrl3(resolve3(url));
}
async function hash(value) {
  return decoder.decode(
    encode(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", encoder.encode(value))
      )
    )
  );
}
async function urlToFilename(url) {
  const cacheFilename = baseUrlToFilename(url);
  const hashedFilename = await hash(url.pathname + url.search);
  return join4(cacheFilename, hashedFilename);
}
async function isFile(filePath) {
  try {
    const stats = await Deno.lstat(filePath);
    return stats.isFile;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
function homeDir() {
  switch (Deno.build.os) {
    case "windows":
      return Deno.env.get("USERPROFILE");
    case "linux":
    case "darwin":
      return Deno.env.get("HOME");
    default:
      throw Error("unreachable");
  }
}
function cacheDir() {
  if (Deno.build.os === "darwin") {
    const home = homeDir();
    if (home) {
      return join4(home, "Library/Caches");
    }
  } else if (Deno.build.os === "linux") {
    const cacheHome = Deno.env.get("XDG_CACHE_HOME");
    if (cacheHome) {
      return cacheHome;
    } else {
      const home = homeDir();
      if (home) {
        return join4(home, ".cache");
      }
    }
  } else {
    return Deno.env.get("LOCALAPPDATA");
  }
}
function denoCacheDir() {
  const dd = Deno.env.get("DENO_DIR");
  let root;
  if (dd) {
    root = normalize4(isAbsolute3(dd) ? dd : join4(Deno.cwd(), dd));
  } else {
    const cd = cacheDir();
    if (cd) {
      root = join4(cd, "deno");
    } else {
      const hd = homeDir();
      if (hd) {
        root = join4(hd, ".deno");
      }
    }
  }
  return root;
}

// https://deno.land/x/plug@1.0.0/download.ts
var defaultExtensions = {
  darwin: "dylib",
  linux: "so",
  windows: "dll"
};
var defaultPrefixes = {
  darwin: "lib",
  linux: "lib",
  windows: ""
};
function getCrossOption(record) {
  if (record === void 0) {
    return;
  }
  if ("darwin" in record || "linux" in record || "windows" in record) {
    const subrecord = record[Deno.build.os];
    if (subrecord && typeof subrecord === "object" && ("x86_64" in subrecord || "aarch64" in subrecord)) {
      return subrecord[Deno.build.arch];
    } else {
      return subrecord;
    }
  }
  if ("x86_64" in record || "aarch64" in record) {
    const subrecord = record[Deno.build.arch];
    if (subrecord && typeof subrecord === "object" && ("darwin" in subrecord || "linux" in subrecord || "windows" in subrecord)) {
      return subrecord[Deno.build.os];
    } else {
      return subrecord;
    }
  }
}
function createDownloadURL(options) {
  if (typeof options === "string" || options instanceof URL) {
    options = { url: options };
  }
  options.extensions ??= defaultExtensions;
  options.prefixes ??= defaultPrefixes;
  for (const key in options.extensions) {
    const os = key;
    if (options.extensions[os] !== void 0) {
      options.extensions[os] = options.extensions[os].replace(/\.?(.+)/, "$1");
    }
  }
  let url;
  if (options.url instanceof URL) {
    url = options.url;
  } else if (typeof options.url === "string") {
    url = stringToURL(options.url);
  } else {
    const tmpUrl = getCrossOption(options.url);
    if (tmpUrl === void 0) {
      throw new TypeError(
        `An URL for the "${Deno.build.os}-${Deno.build.arch}" target was not provided.`
      );
    }
    if (typeof tmpUrl === "string") {
      url = stringToURL(tmpUrl);
    } else {
      url = tmpUrl;
    }
  }
  if ("name" in options && !Object.values(options.extensions).includes(extname3(url.pathname))) {
    if (!url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }
    const prefix = getCrossOption(options.prefixes) ?? "";
    const suffix = getCrossOption(options.suffixes) ?? "";
    const extension = options.extensions[Deno.build.os];
    if (options.name === void 0) {
      throw new TypeError(
        `Expected the "name" property for an automatically assembled URL.`
      );
    }
    const filename = `${prefix}${options.name}${suffix}.${extension}`;
    url = new URL(filename, url);
  }
  return url;
}
async function ensureCacheLocation(location = "deno") {
  if (location === "deno") {
    const dir = denoCacheDir();
    if (dir === void 0) {
      throw new Error(
        "Could not get the deno cache directory, try using another CacheLocation in the plug options."
      );
    }
    location = join4(dir, "plug");
  } else if (location === "cache") {
    const dir = cacheDir();
    if (dir === void 0) {
      throw new Error(
        "Could not get the cache directory, try using another CacheLocation in the plug options."
      );
    }
    location = join4(dir, "plug");
  } else if (location === "cwd") {
    location = join4(Deno.cwd(), "plug");
  } else if (location === "tmp") {
    location = await Deno.makeTempDir({ prefix: "plug" });
  } else if (typeof location === "string" && location.startsWith("file://")) {
    location = fromFileUrl3(location);
  } else if (location instanceof URL) {
    if (location?.protocol !== "file:") {
      throw new TypeError(
        "Cannot use any other protocol than file:// for an URL cache location."
      );
    }
    location = fromFileUrl3(location);
  }
  location = resolve3(normalize4(location));
  await ensureDir(location);
  return location;
}
async function download(options) {
  const location = (typeof options === "object" && "location" in options ? options.location : void 0) ?? "deno";
  const setting = (typeof options === "object" && "cache" in options ? options.cache : void 0) ?? "use";
  const [url, directory] = await Promise.all([
    createDownloadURL(options),
    ensureCacheLocation(location)
  ]);
  const cacheBasePath = join4(directory, await urlToFilename(url));
  const cacheFilePath = `${cacheBasePath}${extname3(url.pathname)}`;
  const cacheMetaPath = `${cacheBasePath}.metadata.json`;
  const cached = setting === "use" ? await isFile(cacheFilePath) : setting === "only" || setting !== "reloadAll";
  await ensureDir(dirname3(cacheBasePath));
  if (!cached) {
    const meta = { url };
    switch (url.protocol) {
      case "http:":
      case "https:": {
        console.log(`${colors_exports.green("Downloading")} ${url}`);
        const response = await fetch(url.toString());
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Could not find ${url}`);
          } else {
            throw new Deno.errors.Http(
              `${response.status} ${response.statusText}`
            );
          }
        }
        await Deno.writeFile(
          cacheFilePath,
          new Uint8Array(await response.arrayBuffer())
        );
        break;
      }
      case "file:": {
        console.log(`${colors_exports.green("Copying")} ${url}`);
        await Deno.copyFile(fromFileUrl3(url), cacheFilePath);
        if (Deno.build.os !== "windows") {
          await Deno.chmod(cacheFilePath, 420);
        }
        break;
      }
      default: {
        throw new TypeError(
          `Cannot fetch to cache using the "${url.protocol}" protocol`
        );
      }
    }
    await Deno.writeTextFile(cacheMetaPath, JSON.stringify(meta));
  }
  if (!await isFile(cacheFilePath)) {
    throw new Error(`Could not find "${url}" in cache.`);
  }
  return cacheFilePath;
}

// https://deno.land/x/plug@1.0.0/mod.ts
async function dlopen(options, symbols) {
  return Deno.dlopen(await download(options), symbols);
}

// https://deno.land/x/deno_notify@1.4.3/ts/plugin.ts
var VERSION = "1.4.3";
var CACHE_POLICY = Deno.env.get("NOTIFY_PLUGIN_URL") === void 0 ? "use" : "reloadAll";
var NOTIFY_PLUGIN_URL = Deno.env.get("NOTIFY_PLUGIN_URL") ?? `https://github.com/Pandawan/deno_notify/releases/download/${VERSION}/`;
var library = await dlopen({
  name: "deno_notify",
  url: NOTIFY_PLUGIN_URL,
  cache: CACHE_POLICY,
  suffixes: {
    darwin: `.${Deno.build.arch}`
  }
}, {
  notify_send: { parameters: ["buffer", "usize"], result: "buffer" }
});
function readPointer(v) {
  if (v == null) return null;
  const ptr = new Deno.UnsafePointerView(v);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}
function notify_send(json) {
  const encodedJson = new TextEncoder().encode(json);
  const ptrResult = library.symbols.notify_send(
    encodedJson,
    encodedJson.length
  );
  const bufResult = readPointer(ptrResult);
  if (bufResult == null) {
    return {
      type: "error",
      when: "parsing_result",
      message: "Native deno_notify library returned a null pointer. Something is wrong."
    };
  }
  const decodedJson = new TextDecoder().decode(bufResult);
  const result = JSON.parse(decodedJson);
  return result;
}

// https://deno.land/x/deno_notify@1.4.3/ts/notification.ts
var Notification = class {
  /**
   * Which platform-specific features to support in this notification.
   */
  supports;
  /**
   * Whether or not to error if a feature is called on an operating system that does not support it.
   */
  strictSupport;
  _title = null;
  _subtitle = null;
  _body = null;
  _icon = null;
  _soundName = null;
  _timeout = null;
  /**
   * Create a Notification.
   * Most fields are empty by default.
   *
   * Platform specific-features are locked behind the `supports` parameter.
   *
   * @param supports Which platform-specific features to support in this notification.
   * @param strictSupport Whether or not to error if a feature is called on an operating system that does not support it.
   *
   * @example
   * ```ts
   * // By default, no platform-specific features are allowed.
   * const n1 = new Notification();
   *
   * // Allow macos-specific features.
   * // This will throw if a macos-specific feature is called on non-macos platforms.
   * const n2 = new Notification({ macos: true });
   *
   * // Allow macos-specific features.
   * // This will ignore macos-specific features on non-macos platforms.
   * const n3 = new Notification({ macos: true }, false);
   * ```
   */
  constructor({
    macos = false,
    windows = false,
    linux = false
  } = {}, strictSupport = true) {
    this.supports = {
      macos,
      windows,
      linux
    };
    this.strictSupport = strictSupport;
  }
  /**
   * Set the `title`.
   * This is a required field.
   * Available on all platforms.
   *
   * For more elaborate content, use the `body` field.
   *
   * @param title
   */
  title = (title) => {
    this._title = title;
    return this;
  };
  /**
   * Set the `subtitle`.
   * Available on macOS and Windows.
   *
   * For more elaborate content, use the `body` field.
   *
   * @param subtitle
   */
  subtitle = (subtitle) => {
    if (this.#verifyPlatform(["macos", "windows"], "subtitle") === false) {
      return this;
    }
    this._subtitle = subtitle;
    return this;
  };
  /**
   * Set the `body`.
   * Available on all platforms.
   *
   * Multiline textual content of the notification.
   * Each line should be treated as a paragraph.
   * Simple html markup may be supported on some platforms.
   *
   * @param body
   */
  body = (body) => {
    this._body = body;
    return this;
  };
  /**
   * Set the `icon`.
   * Available on Linux.
   *
   * Can either be a file:// URI,
   * or a common icon name, usually those in `/usr/share/icons`
   * can all be used (or freedesktop.org names).
   *
   * @param icon
   */
  icon = (icon) => {
    if (this.#verifyPlatform(["linux"], "icon") === false) return this;
    this._icon = icon;
    return this;
  };
  /**
   * Set the `soundName` to play with the notification.
   *
   * With macOS support, a list of default sound names is provided.
   *
   * @param soundName
   */
  soundName = (soundName) => {
    this._soundName = soundName;
    return this;
  };
  /**
   * Set the `timeout`.
   * Available on Windows and Linux.
   *
   * This sets the time (in milliseconds) from the time the notification is displayed
   * until it is closed again by the Notification Server.
   *
   * Setting this to `'never'` will cause the notification to never expire.
   *
   * @param timeout
   */
  timeout = (timeout) => {
    if (this.#verifyPlatform(["windows", "linux"], "timeout") === false) {
      return this;
    }
    if (typeof timeout === "number" && timeout <= 0) {
      throw new Error(
        "Notification timeout must be a number greater than 0 (or 'never')."
      );
    }
    if (timeout === "never") {
      this._timeout = { type: "Never" };
    } else if (typeof timeout === "number") {
      this._timeout = { type: "Milliseconds", value: timeout };
    }
    return this;
  };
  /**
   * Display the notification to the user.
   *
   * @throws When an error occurs while sending the notification.
   */
  show = () => {
    if (this.#verifyCanBeSent() !== true) return;
    const json = JSON.stringify(this);
    const result = notify_send(json);
    if (result.type === "error") {
      throw new Error(`${result.message} (when: ${result.when})`);
    }
  };
  /**
   * Clone the notification into a separate instance, maintaining all the properties.
   *
   * @returns The new notification instance.
   */
  clone = () => {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
  };
  /**
   * Verify whether or not the notification has the minimum required fields to be sent.
   *
   * @throws If the notification cannot be sent with the appropriate explanation error.
   * @returns True if the notification can be sent.
   */
  #verifyCanBeSent = () => {
    if (this._title === null) {
      throw new Error(`Notification instance must have a title.`);
    }
    return true;
  };
  /**
   * Verify whether a feature meant for a given platform should be run on the current platform.
   *
   * @param requestedPlatforms The requested platform to verify against the current platform.
   * @throws If the platform is not supported by the notification instance.
   * @throws If the feature should not be run (while in strict mode).
   * @returns True if the feature should be run, false if the feature should not be run (while in non-strict mode).
   */
  #verifyPlatform = (requestedPlatforms, featureName) => {
    const currentPlatform = Deno.build.os === "darwin" ? "macos" : Deno.build.os;
    const supportedPlatforms = requestedPlatforms.filter(
      (platform) => this.supports[platform]
    );
    if (supportedPlatforms.length === 0) {
      const unsupportedPlatforms = requestedPlatforms.filter(
        (platform) => this.supports[platform] === false
      );
      throw new Error(
        `Notification instance does not explicitly support ${unsupportedPlatforms.join(", or ")}.`
      );
    }
    const isPlatformValid = supportedPlatforms.some((platform) => currentPlatform === platform);
    if (this.strictSupport === false) {
      return isPlatformValid;
    }
    if (isPlatformValid === false) {
      throw new Error(
        `Current operating system (${currentPlatform}) does not support ${featureName}.`
      );
    }
    return true;
  };
};

// https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/utils/mod.ts
function divide(num, den) {
  return [Math.trunc(num / den), num % den];
}

// https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/Duration/constants.ts
var DURATION_UNIT_MAP = {
  "years": "y",
  "months": "mo",
  "weeks": "w",
  "days": "d",
  "hours": "h",
  "minutes": "m",
  "seconds": "s",
  "milliseconds": "ms"
};
var DURATION_UNITS = Object.keys(
  DURATION_UNIT_MAP
);
var DURATION_REGEXP = new RegExp(
  "^" + Object.values(DURATION_UNIT_MAP).map((L) => `(?:(\\d+)${L})?`).join("") + "$"
);
var S_TO_MS = 1e3;
var M_TO_S = 60;
var H_TO_M = 60;
var D_TO_H = 24;
var W_TO_D = 7;
var MO_TO_D = 30;
var Y_TO_D = 365;
var M_TO_MS = M_TO_S * S_TO_MS;
var H_TO_MS = H_TO_M * M_TO_MS;
var D_TO_MS = D_TO_H * H_TO_MS;
var W_TO_MS = W_TO_D * D_TO_MS;
var MO_TO_MS = MO_TO_D * D_TO_MS;
var Y_TO_MS = Y_TO_D * D_TO_MS;
var TO_MS = {
  "milliseconds": 1,
  "seconds": S_TO_MS,
  "minutes": M_TO_MS,
  "hours": H_TO_MS,
  "days": D_TO_MS,
  "weeks": W_TO_MS,
  "months": MO_TO_MS,
  "years": Y_TO_MS
};

// https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/Duration/functions.ts
function _durationStringToEntries(input) {
  const parts = input.match(DURATION_REGEXP)?.slice(1) || [];
  return DURATION_UNITS.map((unit, i) => [unit, parts[i]]).filter(([_, val]) => val !== void 0).map(([unit, val]) => [unit, Number(val)]);
}
function _durationLikeFromString(input) {
  const entries = _durationStringToEntries(input);
  if (!entries.length) {
    throw new Error(`"${input}" is not a valid duration string.`);
  }
  return Object.fromEntries(entries);
}
function _durationLikeToMilliseconds(input) {
  const entries = Object.entries(input);
  return entries.reduce(
    (total, [unit, amount]) => total + amount * TO_MS[unit],
    0
  );
}
function _durationLikeFromMilliseconds(ms) {
  if (ms < 1) return { milliseconds: 0 };
  const result = {};
  let remainder = Math.round(ms);
  for (const unit of DURATION_UNITS) {
    const [amount, _remainder] = divide(remainder, TO_MS[unit]);
    if (amount < 1) continue;
    remainder = _remainder;
    result[unit] = amount;
  }
  return result;
}
function isDurationLike(input) {
  const values = DURATION_UNITS.map((unit) => input[unit]).filter((val) => val !== void 0);
  return values.length > 0 && values.every((val) => typeof val === "number");
}
function createDurationLike(input) {
  if (typeof input === "number") {
    return { minutes: input };
  } else if (typeof input === "string") {
    return _durationLikeFromString(input);
  } else if (typeof input === "object" && input !== null && isDurationLike(input)) {
    return input;
  } else {
    throw new Error("Could not convert arguments to a Duration");
  }
}
function durationLikeToUnit(input, unit) {
  return _durationLikeToMilliseconds(input) / TO_MS[unit];
}
function durationLikeToString(input) {
  let result = "";
  for (const unit of DURATION_UNITS) {
    const amount = input[unit];
    if (amount === void 0) continue;
    const U = DURATION_UNIT_MAP[unit];
    result += `${amount}${U}`;
  }
  return result;
}
function formatDurationLike(input, units) {
  if (!units.length) {
    throw new Error("Invalid units: " + JSON.stringify(units));
  }
  const result = {};
  let remainder = Math.round(_durationLikeToMilliseconds(input));
  for (const unit of DURATION_UNITS) {
    if (!units.includes(unit)) continue;
    const [amount, _remainder] = divide(remainder, TO_MS[unit]);
    remainder = _remainder;
    result[unit] = amount;
  }
  return result;
}
function standardizeDurationLike(input) {
  return _durationLikeFromMilliseconds(_durationLikeToMilliseconds(input));
}
function roundDurationLike(input, to, strategy = "nearest") {
  const toObj = typeof to === "string" ? _durationLikeFromString(to) : to;
  const inputMS = _durationLikeToMilliseconds(input);
  const toMS = _durationLikeToMilliseconds(toObj);
  let newMS = 0;
  const cap = inputMS - toMS || 0;
  while (newMS < cap) {
    newMS += toMS;
  }
  if (strategy === "up") {
    newMS += toMS;
  } else if (strategy === "nearest") {
    const remainder = inputMS - newMS;
    const shouldRoundUp = Boolean(Math.round(remainder / toMS));
    if (shouldRoundUp) {
      newMS += toMS;
    }
  }
  return _durationLikeFromMilliseconds(newMS);
}

// https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/Duration/class.ts
var Duration = class {
  standardized;
  years = 0;
  months = 0;
  weeks = 0;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  constructor(input) {
    this.standardized = standardizeDurationLike(createDurationLike(input));
    const entries = Object.entries(
      this.standardized
    );
    for (const [unit, amount] of entries) {
      this[unit] = amount;
    }
  }
  toString(options = {}) {
    return durationLikeToString(this.toJSON(options));
  }
  toJSON(options = {}) {
    const { units, round } = options;
    let obj = this.standardized;
    if (round !== void 0) {
      const [strategy, to] = round;
      obj = roundDurationLike(obj, to, strategy);
    }
    if (units !== void 0) {
      obj = formatDurationLike(obj, units);
    }
    return obj;
  }
  toUnit(unit) {
    return durationLikeToUnit(this.standardized, unit);
  }
};

// nif.js
var command = new Deno.Command(Deno.args[0], {
  args: Deno.args.slice(1)
});
var child = command.spawn();
var promise = child.status;
var start = performance.now();
var minimumWait = Deno.env.get("NIF_MIN_WAIT_SECONDS") || "0.15";
var notif = new Notification();
var { code: code2 } = await promise;
var duration = (performance.now() - start) / 1e3;
if (!minimumWait || duration > minimumWait - 0) {
  notif.title(`Took ${new Duration({ seconds: duration })}: ${Deno.args.join(" ")}`);
  notif.show();
}
Deno.exit(code2);
