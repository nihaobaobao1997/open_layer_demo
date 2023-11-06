import Constants from "../Constants";
/**
 * 两点距离
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 */
export function distance(pnt1, pnt2) {
  const deltX = pnt2[0] - pnt1[0];
  const deltY = pnt2[1] - pnt1[1];
  return Math.sqrt(deltX * deltX + deltY * deltY);
}

/**
 * 线的距离
 * @param {Array<Array[2]>} line
 */
export function wholeDistance(line) {
  let dis = 0;
  for (let i = 0; i < line.length - 1; i++) {
    dis += distance(line[i], line[i + 1]);
  }
  return dis;
}

/**
 * 线的基础长度
 * @param {Array<Array[2]>} line
 */
export function getBaseLength(line) {
  return Math.pow(wholeDistance(line), 0.99);
}

/**
 * 两点的中点
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 */
export function mid(pnt1, pnt2) {
  return [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
}

/**
 * 两点连线的角度
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 */
export function angle(pnt1, pnt2) {
  return Math.atan2(pnt2[1] - pnt1[1], pnt2[0] - pnt1[0]);
}

/**
 * 三个点计算圆心
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 * @param {Array[2]} pnt3
 */
export function getCircleCenterOfThreePoints(pnt1, pnt2, pnt3) {
  const pntA = [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
  const pntB = [pntA[0] - pnt1[1] + pnt2[1], pntA[1] + pnt1[0] - pnt2[0]];
  const pntC = [(pnt1[0] + pnt3[0]) / 2, (pnt1[1] + pnt3[1]) / 2];
  const pntD = [pntC[0] - pnt1[1] + pnt3[1], pntC[1] + pnt1[0] - pnt3[0]];
  return getIntersectPoint(pntA, pntB, pntC, pntD);
}

/**
 * AB连线和CD连线的交点
 * @param {Array[2]} pntA
 * @param {Array[2]} pntB
 * @param {Array[2]} pntC
 * @param {Array[2]} pntD
 */
export function getIntersectPoint(pntA, pntB, pntC, pntD) {
  if (pntA[1] == pntB[1]) {
    var f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1]);
    var x = f * (pntA[1] - pntC[1]) + pntC[0];
    var y = pntA[1];
    return [x, y];
  }
  if (pntC[1] == pntD[1]) {
    var e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1]);
    x = e * (pntC[1] - pntA[1]) + pntA[0];
    y = pntC[1];
    return [x, y];
  }
  e = (pntB[0] - pntA[0]) / (pntB[1] - pntA[1]);
  f = (pntD[0] - pntC[0]) / (pntD[1] - pntC[1]);
  y = (e * pntA[1] - pntA[0] - f * pntC[1] + pntC[0]) / (e - f);
  x = e * y - e * pntA[1] + pntA[0];
  return [x, y];
}

/**
 * 计算两点方位角
 * @param {Array[2]} startPnt
 * @param {Array[2]} endPnt
 */
export function getAzimuth(startPnt, endPnt) {
  const angle = Math.asin(
    Math.abs(endPnt[1] - startPnt[1]) / distance(startPnt, endPnt)
  );
  let azimuth;
  if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0]) {
    azimuth = angle + Math.PI;
  } else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0]) {
    azimuth = Constants.TWO_PI - angle;
  } else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0]) {
    azimuth = angle;
  } else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0]) {
    azimuth = Math.PI - angle;
  }
  return azimuth;
}

/**
 * 计算AB连线和BC连线形成的角度
 * @param {Array[2]} pntA
 * @param {Array[2]} pntB
 * @param {Array[2]} pntC
 */
export function getAngleOfThreePoints(pntA, pntB, pntC) {
  const angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
  return angle < 0 ? angle + Constants.TWO_PI : angle;
}

/**
 * 三点是否顺时针顺序
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 * @param {Array[2]} pnt3
 */
export function isClockWise(pnt1, pnt2, pnt3) {
  return (
    (pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) >
    (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0])
  );
}

/**
 * 从两点间的比例提取点
 * @param {Number} percent
 * @param {Array[2]} startPnt
 * @param {Array[2]} endPnt
 */
export function getPointOnLine(percent, startPnt, endPnt) {
  return [
    startPnt[0] + percent * (endPnt[0] - startPnt[0]),
    startPnt[1] + percent * (endPnt[1] - startPnt[1])
  ];
}

/**
 * 从两点间的某一长度提取点
 * @param {Array[2]} startPnt
 * @param {Array[2]} endPnt
 * @param {Number} dis
 */
export function getPointOnLineByDistance(startPnt, endPnt, dis) {
  const totalDis = distance(startPnt, endPnt);
  const percent = dis / totalDis;
  return getPointOnLine(percent, startPnt, endPnt);
}

/**
 * 立方体值
 * @param {Number} t
 * @param {Array[2]} startPnt
 * @param {Array[2]} cPnt1
 * @param {Array[2]} cPnt2
 * @param {Array[2]} endPnt
 */
export function getCubicValue(t, startPnt, cPnt1, cPnt2, endPnt) {
  t = Math.max(Math.min(t, 1), 0);
  const tp = 1 - t;
  const t2 = t * t;
  const t3 = t2 * t;
  const tp2 = tp * tp;
  const tp3 = tp2 * tp;
  const x =
    tp3 * startPnt[0] +
    3 * tp2 * t * cPnt1[0] +
    3 * tp * t2 * cPnt2[0] +
    t3 * endPnt[0];
  const y =
    tp3 * startPnt[1] +
    3 * tp2 * t * cPnt1[1] +
    3 * tp * t2 * cPnt2[1] +
    t3 * endPnt[1];
  return [x, y];
}

/**
 * 均匀切割线上的点
 * @param {Array<Array[2]>} line
 * @param {Number} gap
 */
export function splitLineEvenly(line, gap) {
  let over = 0;
  let last = line[0];
  const pnts = [last];
  for (let i = 1; i < line.length; i++) {
    const point = line[i];
    let total = over + distance(last, point);
    let dis = gap - over;
    while (total >= gap) {
      const npnt = getPointOnLineByDistance(last, point, dis);
      pnts.push(npnt);
      dis = gap;
      total -= gap;
      last = npnt;
    }
    over = total;
    last = point;
  }
  pnts.push(last);
  return pnts;
}

/**
 * 计算第三个点
 * @param {Array[2]} startPnt
 * @param {Array[2]} endPnt
 * @param {Number} angle
 * @param {Number} dis
 * @param {Boolean} clockWise
 */
export function getThirdPoint(startPnt, endPnt, angle, distance, clockWise) {
  const azimuth = getAzimuth(startPnt, endPnt);
  const alpha = clockWise ? azimuth + angle : azimuth - angle;
  const dx = distance * Math.cos(alpha);
  const dy = distance * Math.sin(alpha);
  return [endPnt[0] + dx, endPnt[1] + dy];
}

/**
 * 计算弧度上的点
 * @param {Array[2]} center
 * @param {Number} radius
 * @param {Number} startAngle
 * @param {Number} endAngle
 */
export function getArcPoints(center, radius, startAngle, endAngle) {
  let angleDiff = endAngle - startAngle;
  angleDiff = angleDiff < 0 ? angleDiff + Constants.TWO_PI : angleDiff;
  const pnts = [];
  for (let i = 0; i <= Constants.FITTING_COUNT; i++) {
    const angle = startAngle + (angleDiff * i) / Constants.FITTING_COUNT;
    pnts.push([
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle)
    ]);
  }
  return pnts;
}

/**
 * 计算三点的平分线
 * @param {Number} t
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 * @param {Array[2]} pnt3
 */
export function getBisectorNormals(t, pnt1, pnt2, pnt3) {
  const normal = getNormal(pnt1, pnt2, pnt3);
  const dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
  const uX = normal[0] / dist;
  const uY = normal[1] / dist;
  const d1 = distance(pnt1, pnt2);
  const d2 = distance(pnt2, pnt3);

  let right;
  let left;
  if (dist > Constants.ZERO_TOLERANCE) {
    if (isClockWise(pnt1, pnt2, pnt3)) {
      const dt1 = t * d1;
      right = [pnt2[0] - dt1 * uY, pnt2[1] + dt1 * uX];
      const dt2 = t * d2;
      left = [pnt2[0] + dt2 * uY, pnt2[1] - dt2 * uX];
    } else {
      const dt1 = t * d1;
      right = [pnt2[0] + dt1 * uY, pnt2[1] - dt1 * uX];
      const dt2 = t * d2;
      left = [pnt2[0] - dt2 * uY, pnt2[1] + dt2 * uX];
    }
  } else {
    right = [
      pnt2[0] + t * (pnt1[0] - pnt2[0]),
      pnt2[1] + t * (pnt1[1] - pnt2[1])
    ];
    left = [
      pnt2[0] + t * (pnt3[0] - pnt2[0]),
      pnt2[1] + t * (pnt3[1] - pnt2[1])
    ];
  }
  return [right, left];
}

/**
 * 计算三点的平分线
 * @param {Array[2]} pnt1
 * @param {Array[2]} pnt2
 * @param {Array[2]} pnt3
 */
export function getNormal(pnt1, pnt2, pnt3) {
  let dX1 = pnt1[0] - pnt2[0];
  let dY1 = pnt1[1] - pnt2[1];
  const d1 = Math.sqrt(dX1 * dX1 + dY1 * dY1);
  dX1 /= d1;
  dY1 /= d1;

  let dX2 = pnt3[0] - pnt2[0];
  let dY2 = pnt3[1] - pnt2[1];
  const d2 = Math.sqrt(dX2 * dX2 + dY2 * dY2);
  dX2 /= d2;
  dY2 /= d2;

  return [dX1 + dX2, dY1 + dY2];
}

/**
 * 由控制点拟合平滑曲线
 * @param {Number} t
 * @param {Array<Array[2]>} controlPoints
 */
export function getCurvePoints(t, controlPoints) {
  const leftControl = getLeftMostControlPoint(controlPoints);
  let normals = [leftControl];
  for (let i = 0; i < controlPoints.length - 2; i++) {
    const pnt1 = controlPoints[i];
    const pnt2 = controlPoints[i + 1];
    const pnt3 = controlPoints[i + 2];
    const normalPoints = getBisectorNormals(t, pnt1, pnt2, pnt3);
    normals = normals.concat(normalPoints);
  }
  const rightControl = getRightMostControlPoint(controlPoints);
  normals.push(rightControl);
  const points = [];
  for (let i = 0; i < controlPoints.length - 1; i++) {
    const pnt1 = controlPoints[i];
    const pnt2 = controlPoints[i + 1];
    points.push(pnt1);
    for (let n = 0; n < Constants.FITTING_COUNT; n++) {
      const pnt = getCubicValue(
        n / Constants.FITTING_COUNT,
        pnt1,
        normals[i * 2],
        normals[i * 2 + 1],
        pnt2
      );
      points.push(pnt);
    }
    points.push(pnt2);
  }
  return points;
}

/**
 * 控制点
 * @param {Array<Array[2]>} controlPoints
 */
export function getLeftMostControlPoint(controlPoints) {
  const pnt1 = controlPoints[0];
  const pnt2 = controlPoints[1];
  const pnt3 = controlPoints[2];
  const pnts = getBisectorNormals(0, pnt1, pnt2, pnt3);
  const normalRight = pnts[0];
  const normal = getNormal(pnt1, pnt2, pnt3);
  const dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
  let controlX, controlY;
  if (dist > Constants.ZERO_TOLERANCE) {
    const arr_mid = mid(pnt1, pnt2);
    const pX = pnt1[0] - arr_mid[0];
    const pY = pnt1[1] - arr_mid[1];

    const d1 = distance(pnt1, pnt2);
    // normal at midpoint
    const n = 2.0 / d1;
    const nX = -n * pY;
    const nY = n * pX;

    // upper triangle of symmetric transform matrix
    const a11 = nX * nX - nY * nY;
    const a12 = 2 * nX * nY;
    const a22 = nY * nY - nX * nX;

    const dX = normalRight[0] - arr_mid[0];
    const dY = normalRight[1] - arr_mid[1];

    // coordinates of reflected vector
    controlX = arr_mid[0] + a11 * dX + a12 * dY;
    controlY = arr_mid[1] + a12 * dX + a22 * dY;
  }
  return [controlX, controlY];
}

/**
 * 控制点
 * @param {Array<Array[2]>} controlPoints
 */
export function getRightMostControlPoint(controlPoints) {
  const count = controlPoints.length;
  const pnt1 = controlPoints[count - 3];
  const pnt2 = controlPoints[count - 2];
  const pnt3 = controlPoints[count - 1];
  const pnts = getBisectorNormals(0, pnt1, pnt2, pnt3);
  const normalLeft = pnts[1];
  const normal = getNormal(pnt1, pnt2, pnt3);
  const dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);

  let controlX, controlY;
  if (dist > Constants.ZERO_TOLERANCE) {
    const arr_mid = mid(pnt2, pnt3);
    const pX = pnt3[0] - arr_mid[0];
    const pY = pnt3[1] - arr_mid[1];

    const d1 = distance(pnt2, pnt3);
    // normal at midpoint
    const n = 2.0 / d1;
    const nX = -n * pY;
    const nY = n * pX;

    // upper triangle of symmetric transform matrix
    const a11 = nX * nX - nY * nY;
    const a12 = 2 * nX * nY;
    const a22 = nY * nY - nX * nX;

    const dX = normalLeft[0] - arr_mid[0];
    const dY = normalLeft[1] - arr_mid[1];

    // coordinates of reflected vector
    controlX = arr_mid[0] + a11 * dX + a12 * dY;
    controlY = arr_mid[1] + a12 * dX + a22 * dY;
    // } else {
    //   console.log(t, "getRightMostControlPoint");
    //   controlX = pnt3[0] + t * (pnt2[0] - pnt3[0]);
    //   controlY = pnt3[1] + t * (pnt2[1] - pnt3[1]);
  }
  return [controlX, controlY];
}

/**
 * 获取Bezier曲线点
 * @param {Array<Array[2]>} points
 */
export function getBezierPoints(points) {
  if (points.length <= 2) {
    return points;
  }
  const bezierPoints = [];
  const n = points.length - 1;
  for (let t = 0; t <= 1; t += 0.01) {
    let x = 0;
    let y = 0;
    for (let index = 0; index <= n; index++) {
      const factor = getBinomialFactor(n, index);
      const a = Math.pow(t, index);
      const b = Math.pow(1 - t, n - index);
      x += factor * a * b * points[index][0];
      y += factor * a * b * points[index][1];
    }
    bezierPoints.push([x, y]);
  }
  bezierPoints.push(points[n]);
  return bezierPoints;
}

/**
 * 二项式因子
 * @param {Number} n
 * @param {Number} index
 */
export function getBinomialFactor(n, index) {
  return getFactorial(n) / (getFactorial(index) * getFactorial(n - index));
}

/**
 * 阶乘
 * @param {Number} n
 */
export function getFactorial(n) {
  if (n <= 1) return 1;
  if (n == 2) return 2;
  if (n == 3) return 6;
  if (n == 4) return 24;
  if (n == 5) return 120;
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
/**
 * 获取二次B样条曲线点
 * @param {Array<Array[2]>} points
 */
export function getQBSplinePoints(points) {
  if (points.length <= 2) {
    return points;
  }
  const n = 2;
  const bSplinePoints = [];
  const m = points.length - n - 1;
  bSplinePoints.push(points[0]);
  for (let i = 0; i <= m; i++) {
    for (let t = 0; t <= 1; t += 0.05) {
      let x = 0;
      let y = 0;
      for (let k = 0; k <= n; k++) {
        const factor = getQuadricBSplineFactor(k, t);
        x += factor * points[i + k][0];
        y += factor * points[i + k][1];
      }
      bSplinePoints.push([x, y]);
    }
  }
  bSplinePoints.push(points[points.length - 1]);
  return bSplinePoints;
}

/**
 * 二次B样条因子
 * @param {Number} k
 * @param {Number} t
 */
export function getQuadricBSplineFactor(k, t) {
  if (k == 0) return Math.pow(t - 1, 2) / 2;
  if (k == 1) return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2;
  if (k == 2) return Math.pow(t, 2) / 2;
  return 0;
}
