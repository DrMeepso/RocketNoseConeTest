export abstract class Shape {
    name: string;
    description1: string;
    description2: string;
    clippable: boolean;

    constructor(name: string, description1: string, description2: string, clippable: boolean = false) {
        this.name = name;
        this.description1 = description1;
        this.description2 = description2;
        this.clippable = clippable;
    }

    usesParameter(): boolean {
        return false;
    }

    defaultParameter(): number {
        return 0;
    }

    maxParameter(): number {
        return 1;
    }

    abstract getRadius(x: number, radius: number, length: number, param: number): number;
}

// Helper functions
const pow2 = (x: number) => x * x;
const pow3 = (x: number) => x * x * x;
const safeSqrt = (x: number) => x >= 0 ? Math.sqrt(x) : 0;

class ConicalShape extends Shape {
    constructor() {
        super(
            "Conical",
            "A conical nose cone has a profile of a triangle.",
            "A conical transition has straight sides."
        );
    }

    getRadius(x: number, radius: number, length: number, _param: number): number {
        return radius * x / length;
    }
}

class OgiveShape extends Shape {
    constructor() {
        super(
            "Ogive",
            "An ogive nose cone has a profile that is a segment of a circle...",
            "An ogive transition has a profile that is a segment of a circle..."
        );
    }

    usesParameter(): boolean {
        return true;
    }

    defaultParameter(): number {
        return 1.0;
    }

    getRadius(x: number, radius: number, length: number, param: number): number {
        if (length < radius) {
            x = x * radius / length;
            length = radius;
        }

        if (param < 1e-9) { // MINFEATURE threshold
            return new ConicalShape().getRadius(x, radius, length, param);
        }

        const R = safeSqrt(
            (pow2(length) + pow2(radius)) *
            (pow2((2 - param) * length) + pow2(param * radius)) /
            (4 * pow2(param * radius))
        );
        const L = length / param;
        const y0 = safeSqrt(pow2(R) - pow2(L));
        return safeSqrt(pow2(R) - pow2(L - x)) - y0;
    }
}

class EllipsoidShape extends Shape {
    constructor() {
        super(
            "Ellipsoid",
            "An ellipsoidal nose cone has a profile of a half-ellipse...",
            "An ellipsoidal transition has a profile of a half-ellipse...",
            true
        );
    }

    getRadius(x: number, radius: number, length: number, _param: number): number {
        x = x * radius / length;
        return safeSqrt(2 * radius * x - pow2(x));
    }
}

class PowerSeriesShape extends Shape {
    constructor() {
        super(
            "Power series",
            "A power series nose cone description...",
            "A power series transition description...",
            true
        );
    }

    usesParameter(): boolean {
        return true;
    }

    defaultParameter(): number {
        return 0.5;
    }

    getRadius(x: number, radius: number, length: number, param: number): number {
        if (param <= 1e-5) {
            return x <= 1e-5 ? 0 : radius;
        }
        return radius * Math.pow(x / length, param);
    }
}

class ParabolicSeriesShape extends Shape {
    constructor() {
        super(
            "Parabolic series",
            "A parabolic series nose cone description...",
            "A parabolic series transition description..."
        );
    }

    usesParameter(): boolean {
        return true;
    }

    defaultParameter(): number {
        return 1.0;
    }

    getRadius(x: number, radius: number, length: number, param: number): number {
        return radius * ((2 * x / length - param * pow2(x / length)) / (2 - param));
    }
}

class HaackSeriesShape extends Shape {
    constructor() {
        super(
            "Haack series",
            "A Haack series nose cone description...",
            "A Haack series transition description...",
            true
        );
    }

    usesParameter(): boolean {
        return true;
    }

    maxParameter(): number {
        return 1/3;
    }

    getRadius(x: number, radius: number, length: number, param: number): number {
        const theta = Math.acos(1 - 2 * x / length);
        if (param === 0) {
            return radius * safeSqrt((theta - Math.sin(2 * theta)/2) / Math.PI);
        }
        return radius * safeSqrt(
            (theta - Math.sin(2 * theta)/2 + param * pow3(Math.sin(theta))) / Math.PI
        );
    }
}

// Export shapes as an object similar to Java enum
export const Shapes: {[key: string]: Shape} = {
    Conical: new ConicalShape(),
    Ogive: new OgiveShape(),
    Ellipsoid: new EllipsoidShape(),
    Power: new PowerSeriesShape(),
    Parabolic: new ParabolicSeriesShape(),
    Haack: new HaackSeriesShape(),
};