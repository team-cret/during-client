import THREE from 'three';

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 *
 * @param from 시작점 : THREE.Vector3
 * @param to 도착점 : THREE.Vector3
 * @param isObjectExists 장애물 존재 여부 2차원 배열: Array<Array<boolean>>
 * @returns 시작점, 끝점을 포함한 경로 : Array<THREE.Vector3>
 */
function findRoute(from: THREE.Vector3, to: THREE.Vector3, isObjectExists: Array<Array<boolean>>) {
  if (from.equals(to)) return [];

  let parentOf = Array.from({ length: isObjectExists.length }, () =>
    Array.from({ length: isObjectExists[0].length }, () => -1)
  );

  let queue = [from];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.equals(to)) {
      break;
    }
    const { z, x } = current;

    for (const d of dir) {
      const nZ = z + d[0],
        nX = x + d[1];
      if (nZ < 0 || nZ >= isObjectExists.length || nX < 0 || nX >= isObjectExists[0].length)
        continue;
      if (parentOf[nZ][nX] !== -1) continue;
      if (isObjectExists[nZ][nX]) continue;
      parentOf[nZ][nX] = z * isObjectExists[0].length + x;
      queue.push(new THREE.Vector3(nX, 0, nZ));
    }
  }

  if (parentOf[to.z][to.x] === -1) return [];

  const route: Array<THREE.Vector3> = [];

  let current = to.z * isObjectExists[0].length + to.x;
  while (current !== from.z * isObjectExists[0].length + from.x) {
    route.push(
      new THREE.Vector3(
        current % isObjectExists[0].length,
        0,
        Math.floor(current / isObjectExists[0].length)
      )
    );
    current =
      parentOf[Math.floor(current / isObjectExists[0].length)][current % isObjectExists[0].length];
  }
  route.push(from);
  route.reverse();

  return route;
}

export { findRoute };
