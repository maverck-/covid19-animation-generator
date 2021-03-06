
import { DataPoint, PlotPoint, Options } from '../../util/Types';
import LogPlotPointsGenerator from './LogPlotPointsGenerator';
import LinearPlotPointsGenerator from './LinearPlotPointsGenerator';

const GENERATORS: { [key: string]: (points: DataPoint[]) => PlotPoint[]} = {
	'log': LogPlotPointsGenerator.generate,
	'linear': LinearPlotPointsGenerator.generate,
	'linear-avg7': LinearPlotPointsGenerator.generateAvg7
};

export default class PlotPointsGenerator
{
	public static generate(options: Options, points: DataPoint[]): PlotPoint[]
	{
		const generator = GENERATORS[options.scale];
		if (!generator)
			throw new Error(`Generator not found for scale: ${options.scale}`);
		return generator(points);
	}
}
