"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductLabel =
  exports.getImageUrls =
  exports.formatPrice =
  exports.cn =
    void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
var config_1 = require("../config");
function cn() {
  var inputs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }
  return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatPrice(price, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.currency,
    currency = _a === void 0 ? "USD" : _a,
    _b = options.notation,
    notation = _b === void 0 ? "compact" : _b;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: notation,
    maximumFractionDigits: 2,
  }).format(+price);
}
exports.formatPrice = formatPrice;
function getImageUrls(images) {
  var productImages = images
    .map(function (_a) {
      var image = _a.image;
      return typeof image === "string" ? image : image.url;
    })
    .filter(Boolean);
  return productImages;
}
exports.getImageUrls = getImageUrls;
function getProductLabel(product) {
  var _a;
  var productImages =
    (_a = config_1.PRODUCT_CATEGORIES.find(function (_a) {
      var value = _a.value;
      return value === product.category;
    })) === null || _a === void 0
      ? void 0
      : _a.label;
  return productImages;
}
exports.getProductLabel = getProductLabel;
