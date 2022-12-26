define({ "api": [
  {
    "type": "GET",
    "url": "/index/dujitang",
    "title": "毒鸡汤",
    "description": "<p>毒鸡汤</p>",
    "name": "_____",
    "group": "HOME",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\t\"data\":{\"content\":\"你是我的小苹果，哎呀讨厌！我是说我TM真想削你。\",\"_id\":\"5fbaa160-75cf-11ed-9725-fdb25c09e850\",\"id\":\"5fbaa161-75cf-11ed-9725-fdb25c09e850\"}\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/index/dujitang"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/dujitang.js",
    "groupTitle": "HOME"
  },
  {
    "type": "GET",
    "url": "/lhl/lhl/day/query",
    "title": "黄历信息",
    "description": "<p>黄历信息</p>",
    "name": "______",
    "group": "HUANGLI",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\tchongsha: \"马日冲(戊子)鼠\"\n\t\t\t\tfestival: \"\"\n\t\t\t\tfitness: \"日值月破 大事不宜\"\n\t\t\t\tgregoriandate: \"2022-12-07\"\n\t\t\t\tid: \"fb0ed311-75d5-11ed-b60d-b1950a3c59db\"\n\t\t\t\tjianshen: \"破\"\n\t\t\t\tjieqi: \"大雪\"\n\t\t\t\tlmonthname: \"仲冬\"\n\t\t\t\tlubarmonth: \"十一月\"\n\t\t\t\tlunar_festival: \"\"\n\t\t\t\tlunardate: \"2022-11-14\"\n\t\t\t\tlunarday: \"十四\"\n\t\t\t\tpengzu: \"甲不开仓 午不苫盖\"\n\t\t\t\tshengxiao: \"虎\"\n\t\t\t\tshenwei: \"喜神：东北 福神：正北 财神：东北阳贵：西南 阴贵：东北 \"\n\t\t\t\tsuisha: \"岁煞北\"\n\t\t\t\ttaboo: \"日值月破 大事不宜\"\n\t\t\t\ttaishen: \"占在门,碓须忌,厨灶莫相干胎神在房内北停留5天\"\n\t\t\t\ttiangandizhiday: \"甲午\"\n\t\t\t\ttiangandizhimonth: \"壬子\"\n\t\t\t\ttiangandizhiyear: \"壬寅\"\n\t\t\t\twuxingjiazi: \"金\"\n\t\t\t\twuxingnamonth: \"桑松木\"\n\t\t\t\twuxingnayear: \"金箔金\"\n\t\t\t\txingsu: \"西方参水猿-凶\"\n\t\t\t\t_id: \"fb0ed310-75d5-11ed-b60d-b1950a3c59db\"\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/lhl/day/query?date=2022-12-07"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/lhl_detail.js",
    "groupTitle": "HUANGLI"
  },
  {
    "type": "GET",
    "url": "/lhl/integral/total",
    "title": "用户积分总数",
    "description": "<p>用户积分总数</p>",
    "name": "________",
    "group": "INTEGRAL",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\tintegral: \"940\"\n\t\t\topenid: \"oEjYO0Z3ygbp9u95Xtkrm1l3lu0s\"\n\t\t\t_id: \"efbc6d7162398608011cd7113c384695\"\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/integral/total"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/integral.js",
    "groupTitle": "INTEGRAL"
  },
  {
    "type": "GET",
    "url": "/lhl/jieri/query",
    "title": "节日",
    "description": "<p>节日</p>",
    "name": "____",
    "group": "JIERI",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "show",
            "description": "<p>显示1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":[\n\t\t\t{\n\t\t\t\tdate: \"2022-04-02\"\n\t\t\t\tstatus: \"2\"\n\t\t\t\t_id: \"d2fe6f20624d52f105329d665b846e99\"\n\t\t\t}\n\t\t]\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/jieri/query?show=1"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/jieri.js",
    "groupTitle": "JIERI"
  },
  {
    "type": "GET",
    "url": "/lhl/jiejia/query",
    "title": "节假日",
    "description": "<p>节假日</p>",
    "name": "_____",
    "group": "JIERI",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":[\n\t\t\t{\n\t\t\t\tdate: \"2022-04-02\"\n\t\t\t\tstatus: \"2\"\n\t\t\t\t_id: \"d2fe6f20624d52f105329d665b846e99\"\n\t\t\t}\n\t\t]\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/jiejia/query"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/jieri.js",
    "groupTitle": "JIERI"
  },
  {
    "type": "GET",
    "url": "/index/weather/v7-day",
    "title": "7天天气",
    "description": "<p>7天天气</p>",
    "name": "7_____",
    "group": "WEATHER",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>坐标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>天气类型：3d,7d,10d,15d,30d</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\tintegral: \"940\"\n\t\t\topenid: \"oEjYO0Z3ygbp9u95Xtkrm1l3lu0s\"\n\t\t\t_id: \"efbc6d7162398608011cd7113c384695\"\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/index/weather/v7-day"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/weather.js",
    "groupTitle": "WEATHER"
  },
  {
    "type": "GET",
    "url": "/index/weather/zhishu-day",
    "title": "天气指数",
    "description": "<p>天气指数</p>",
    "name": "______",
    "group": "WEATHER",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>坐标</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>城市</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>指数类型：0</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\tintegral: \"940\"\n\t\t\topenid: \"oEjYO0Z3ygbp9u95Xtkrm1l3lu0s\"\n\t\t\t_id: \"efbc6d7162398608011cd7113c384695\"\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/index/weather/zhishu-day"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/weather.js",
    "groupTitle": "WEATHER"
  },
  {
    "type": "GET",
    "url": "/lhl/index/xingzuo",
    "title": "星座",
    "description": "<p>星座</p>",
    "name": "____",
    "group": "XINGZUO",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "consName",
            "description": "<p>星座名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>星座类型today,tomorrow,week,month,year</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\"code\":200,\n\t\t\"data\":{\n\t\t\taddTime: \"20221207\"\n\t\t\tconsName: \"射手座\"\n\t\t\tcontent: \"{\"name\":\"射手座\",\"date\":\"2022年\",\"year\":2022,\"mima\":{\"info\":\"影响力逐渐增大\",\"text\":[\"进入2022年，你整体的重心和关注点会有所调整，你将会扩大自己的交际范围，并且注重在生活当中的沟通，也会更加的积极主动，去跟别人分享自己的一些想法，包括自己的一些社会价值观等等。因此，你的影响力会在今年逐渐增大，对于自媒体行业的小伙伴而言，你们爆红的几率也较大。射手座2022年可佩戴一个宙斯木星双环扣吉宏项链作为全年的幸运护身符饰物；项链由两个纯银的平安扣相互紧扣，项链上有“Zeus”字母，代表射手座的守护神众神之王宙斯，环扣上由射手座符号和守护星“木星”图案组成，一环扣一环的双环平安扣紧密相依，象征着坚韧不催的毅力和勇气，激励和守护着射手们在2022年里勇往直前、顺风顺水。\"]},\"career\":[\"射手座们今年的运势尚可，已经工作了的射手们能够在人脉资源方面取得进展，而还在读书的小伙伴们也能较好推进手里的项目。但是在项目进展过程当中，还是会发生一些意外和挫折，在事业学业上的表现容易忽高忽低。不要担心，只要稳定好心态，一切都能水到渠成。\"],\"love\":[\"今年对于射手座们而言是非常不错的一年，单身的朋友能够比较轻松地寻觅到属于自己的幸福缘分，而已经有伴的小伙伴们则需要平衡好感情与其他事务，凡事多考虑一下对方的感受，这样才能让你们之间的感情更稳固。\"],\"health\":[\"一些射手座会遇到痤疮、痘痘等皮肤方面的问题，大家平时可以多多关注一下护肤，保持皮肤的健康。\"],\"finance\":[\"射手们的财运在今年缓慢回升中。你们的眼光非常可靠，如果能够勇敢地尝试一下投资、理财的话，往往可以取得不错的成就。但在水逆期间的投资需要多加谨慎一些，否则行情的大起大落也是有可能的。射手座今年可佩戴一串金虎眼石独角兽宝懿手链来提升金钱指数，此手链由射手座今年的财富主石金虎眼石构成；其中男款宝石为彩曜石与金虎眼组合而成，女款宝石则为草莓晶与金虎眼组成；而独角兽乃高贵纯洁的象征，带来幸运和守护，使得射手们2022年能稳守财富，财气延绵。\"],\"luckeyStone\":\"摩根石\",\"future\":\"\",\"resultcode\":\"200\",\"error_code\":0}\"\n\t\t\tdate: \"2022年\"\n\t\t\tid: \"de983dc1-75d0-11ed-b647-a9ea55619280\"\n\t\t\ttypes: \"year\"\n\t\t\tid: \"de983dc0-75d0-11ed-b647-a9ea55619280\"\n\t\t}\n\t}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"code\" : 1,\n    \"msg\" : '获取失败'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3301/lhl/index/xingzuo?consName=%E5%B0%84%E6%89%8B%E5%BA%A7&type=year"
      }
    ],
    "version": "1.0.0",
    "filename": "controllers/xingzuo.js",
    "groupTitle": "XINGZUO"
  }
] });
