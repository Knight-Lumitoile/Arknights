import logo from "./logo.svg";
import "./App.css";
import operators from "./static/config/operators.json";
import { useEffect } from "react";

function App() {
  const calcAP = () => {
    let st = new Set();
    let ops = [];
    for (let i = 0; i < operators.length; i++) {
      let op = {};
      let o = operators[i];
      if (
        o.立绘 &&
        o.综合体检测试.战场机动 &&
        o.综合体检测试.战斗技巧 &&
        o.综合体检测试.战术规划 &&
        o.综合体检测试.源石技艺适应性 &&
        o.综合体检测试.物理强度 &&
        o.综合体检测试.生理耐受
      ) {
        op.name_zh = o.name_zh;
        op.name_en = o.name_en;
        op.rank = o.星级;
        op.img = o.立绘;
        op.综合体检测试 = {};
        op.综合体检测试.战场机动 = o.综合体检测试.战场机动;
        op.综合体检测试.战斗技巧 = o.综合体检测试.战斗技巧;
        op.综合体检测试.战术规划 = o.综合体检测试.战术规划;
        op.综合体检测试.源石技艺适应性 = o.综合体检测试.源石技艺适应性;
        op.综合体检测试.物理强度 = o.综合体检测试.物理强度;
        op.综合体检测试.生理耐受 = o.综合体检测试.生理耐受;
        op.体细胞与源石融合率 =
          o.临床诊断分析.体内源石融合度 ?? o.临床诊断分析.体细胞与源石融合率;
        op.血液源石结晶密度 =
          o.临床诊断分析.血液中源石结晶密度 ??
          o.临床诊断分析.血液内源石密度 ??
          o.临床诊断分析.血液源石结晶密度;
          op.power = getPower(op.综合体检测试)
        if (!ops.some((a) => a.name_zh === op.name_zh)) {
          ops.push(op);
        }
      }
    }
    console.log(ops.sort((a,b)=>a.power-b.power));
  };

  const getPower = (ts) => {
    return (
      getRank(ts.战场机动) +
      getRank(ts.战斗技巧) +
      getRank(ts.战术规划) +
      getRank(ts.源石技艺适应性) +
      getRank(ts.物理强度) +
      getRank(ts.生理耐受)
    );
  };

  const getRank = (ipt) => {
    let a = { 缺陷: 0, 普通: 1, 标准: 2, 优良: 3, 卓越: 4, "■■": 5 };

    // If '■■' is present in the input string, always return 5
    if (ipt.includes("■■")) {
      return a["■■"];
    }

    // Check if each key in 'a' is present in the input string
    const validWords = Object.keys(a).filter((word) => ipt.includes(word));

    // If no valid words are found, return 0
    if (validWords.length === 0) {
      return 0;
    }

    // If there is only one valid word, return its corresponding value
    if (validWords.length === 1) {
      return a[validWords[0]];
    }

    // If there are multiple valid words, calculate and return the average
    const sum = validWords.reduce((total, word) => total + a[word], 0);
    const average = sum / validWords.length;

    return average;
  };

  useEffect(() => {
    calcAP();
  }, []);

  return <div className="App"></div>;
}

export default App;
