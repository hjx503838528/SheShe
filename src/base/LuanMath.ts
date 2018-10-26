
/**
 * 方向工具
 */
class LuanMath {

	public static _V(myx: number, myy: number, mdx: number, mdy: number) {
		return Math.atan2(mdy - myy, mdx - myx);
	}

	public static getV(myx: number, myy: number, mdx: number, mdy: number) {
		return this._V(myx, myy, mdx, mdy) / Math.PI * 180;
	}

	public static Vspeed(myx: number, myy: number, mdx: number, mdy: number, speed: number = 1) {
		var arr = [];
		arr[0] = Math.cos(this._V(myx, myy, mdx, mdy)) * speed;
		arr[1] = Math.sin(this._V(myx, myy, mdx, mdy)) * speed;
		return arr;
	}

	public static VspeedObj(a: any, b: any, speed: number = 0) {
		return this.Vspeed(a.x, a.y, b.x, b.y, speed);
	}

	//通过角度(180-180)获得x和y的速度
	static getVbackSpeed(v: number, speed: number = 1) {
		var arr = new Array();
		var hu = v / 180 * Math.PI;
		arr[0] = Math.cos(hu) * speed;
		arr[1] = Math.sin(hu) * speed;
		return arr;
	}
}
