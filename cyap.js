let body = $response.body;
console.log("信息", body);
let responseBody;

try {
  responseBody = JSON.parse(body);
} catch (e) {
  console.log("vip_info 脚本：JSON 解析失败 ->", e);
  // 解析失败就直接返回原始响应
  $done({});
}
$notify("1","2","3",null)

// 只处理包含 vip_info 的响应
if (responseBody && responseBody.vip_info) {
  const FAKE_EXPIRE_TS = "1892260800"; // 字符串还是数字看原接口，这里沿用你原来的字符串

  ["svip", "vip"].forEach(level => {
    if (responseBody.vip_info[level]) {
      responseBody.vip_info[level] = {
        expires_time: FAKE_EXPIRE_TS,
        is_auto_renewal: true
      };
    }
  });
}

$done({ body: JSON.stringify(responseBody) });
