define({
  "name": "老黄历-接口文档",
  "version": "1.0.0",
  "description": "老黄历-接口文档",
  "title": "老黄历-接口文档",
  "url": "http://localhost:3301/lhl/apidoc/index.html",
  "header": {
    "title": "接口通用规则",
    "content": "<h2>API 调用规则</h2>\n<p>本文档中所有请求服务端 API 接口的请求均使用此规则校验，以下不再重复说明。</p>\n<p>API 接口统一请求URL <code>http://127.0.0.1:7001/</code></p>\n<p>每次请求 API 接口时，均需要提供 HTTP Request Header，具体如下：</p>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>类型</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>Authorization</code></td>\n<td>String</td>\n<td>'Authorization':<code>Bearer ${token}</code>-数据签名 - 需要进行登录获取签名（登录注册不需要携带）</td>\n</tr>\n</tbody>\n</table>\n"
  },
  "footer": {
    "title": "API 错误返回值说明",
    "content": "<h1>API 返回值说明</h1>\n<h2>请求返回示例</h2>\n<pre><code class=\"language-json\">{\n     &quot;code&quot; : 200,\n     &quot;message&quot; : &quot;params missing&quot;,\n     &quot;data&quot; : &quot;Object [NULL | NOT NULL]&quot;\n   }\n</code></pre>\n<h2>HTTP 状态码</h2>\n<table>\n<thead>\n<tr>\n<th>code</th>\n<th>描述</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>-1</td>\n<td>错误提交</td>\n<td>具体看返回的错误信息</td>\n</tr>\n<tr>\n<td>200</td>\n<td>成功提交</td>\n<td>请求成功，一般用于GET与POSt请求</td>\n</tr>\n<tr>\n<td>201</td>\n<td>成功提交</td>\n<td>[POST/PUT/PATCH]：用户新建或修改数据成功</td>\n</tr>\n<tr>\n<td>202</td>\n<td>成功提交</td>\n<td>表示一个请求已经进入后台排队（异步任务）</td>\n</tr>\n<tr>\n<td>204</td>\n<td>成功提交</td>\n<td>用户删除数据成功</td>\n</tr>\n<tr>\n<td>301</td>\n<td>重定向</td>\n<td>永久重定向</td>\n</tr>\n<tr>\n<td>302</td>\n<td>重定向</td>\n<td>临时重定向</td>\n</tr>\n<tr>\n<td>400</td>\n<td>请求错误</td>\n<td>[POST/PUT/PATCH]：用户发出的请求有错误</td>\n</tr>\n<tr>\n<td>401</td>\n<td>鉴权失败</td>\n<td>token过期或者不正确，重新登录(账号密码错误)</td>\n</tr>\n<tr>\n<td>403</td>\n<td>访问禁止</td>\n<td>访问是被禁止的</td>\n</tr>\n<tr>\n<td>404</td>\n<td>路由不存在或者资源不存在</td>\n<td>访问的url不存在或者对应资源不存在</td>\n</tr>\n<tr>\n<td>406</td>\n<td>请求格式错误</td>\n<td>用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）</td>\n</tr>\n<tr>\n<td>407</td>\n<td>请求数据不存在</td>\n<td>请求数据不存在</td>\n</tr>\n<tr>\n<td>410</td>\n<td>请求资源被删除</td>\n<td>用户请求的资源被永久删除，且不会再得到的</td>\n</tr>\n<tr>\n<td>500</td>\n<td>服务器内部错误</td>\n<td>内部服务器出错</td>\n</tr>\n<tr>\n<td>501</td>\n<td>服务器内部错误</td>\n<td>服务器不支持请求的功能，无法完成请求</td>\n</tr>\n</tbody>\n</table>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2022-12-07T04:06:24.444Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
