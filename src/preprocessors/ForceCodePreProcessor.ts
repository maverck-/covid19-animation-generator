import { TimeSeries } from '../util/Types';

interface ForceCodeParams
{
	name: string;
	code: string;
}

export default class ForceCodePreProcessor
{
	public static async run(series: TimeSeries[], params: ForceCodeParams): Promise<TimeSeries[]>
	{
		const found = series.find(serie => serie.name === params.name);
		if (found)
			found.forceCode = params.code;
		else
			console.log(`Series not found: ${params.name}`);

		return series;
	}
}
