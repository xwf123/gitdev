define(['runtime'], function(Handlebars) {

this["Vip"] = this["Vip"] || {};

this["Vip"]["index/welfare"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "    <ul>\r\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.result : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.state : depth0), "===", 1, {"name":"compare","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.state : depth0), "===", 2, {"name":"compare","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.compare || (depth0 && depth0.compare) || helperMissing).call(depth0, (depth0 != null ? depth0.state : depth0), "===", 3, {"name":"compare","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <li class=\"rest-welfare\">\r\n            <a class=\"lazy-bg\" href=\"http://yuanxian.youku.com/fls\" target=\"_blank\">\r\n                <img data-original=\""
    + escapeExpression(((helper = (helper = helpers.home_pic_url || (depth0 != null ? depth0.home_pic_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"home_pic_url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"384\" height=\"200\">\r\n            </a>\r\n            <div class=\"desc\">\r\n                <h2>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n                <p>\r\n                    <span>"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\r\n                    <span>剩余<em>"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "</em>张</span>\r\n                </p>\r\n                <a href=\"http://yuanxian.youku.com/fls\" class=\"get-present-btn\" target=\"_blank\">立即领取</a>\r\n            </div>\r\n        </li>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <li class=\"none-welfare\">\r\n            <a class=\"lazy-bg\" href=\"javascript:void(0)\">\r\n                <img data-original=\""
    + escapeExpression(((helper = (helper = helpers.home_pic_url || (depth0 != null ? depth0.home_pic_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"home_pic_url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"384\" height=\"200\">\r\n            </a>\r\n            <div class=\"desc\">\r\n                <h2>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n                <p>\r\n                    <span>"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\r\n                    <span>剩余<em>0</em>张</span>\r\n                </p>\r\n            </div>\r\n        </li>\r\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <li class=\"geted-welfare\">\r\n            <a class=\"lazy-bg\" href=\"javascript:void(0)\" target=\"_blank\">\r\n                <img data-original=\""
    + escapeExpression(((helper = (helper = helpers.home_pic_url || (depth0 != null ? depth0.home_pic_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"home_pic_url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\" width=\"384\" height=\"200\">\r\n            </a>\r\n            <div class=\"desc\">\r\n                <h2>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n                <p>\r\n                    <span>"
    + escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\r\n                    <span>剩余<em>"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "</em>张</span>\r\n                </p>\r\n                <a href=\"http://yuanxian.youku.com/fls\" class=\"how-use-btn\" target=\"_blank\">如何使用</a>\r\n            </div>\r\n        </li>\r\n";
},"9":function(depth0,helpers,partials,data) {
  return "    <p class=\"no-result\">可能是你打开的姿势不对，请刷新试试</p>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.result : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(9, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

return this["Vip"];

});