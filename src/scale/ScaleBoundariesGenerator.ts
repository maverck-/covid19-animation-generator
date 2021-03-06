
import * as Enumerable from 'linq';
import { ScaleBoundaries, PlotSeries, AnimationContext } from '../util/Types';

const MARGIN = 0.2;

export default class ScaleBoundariesGenerator
{
	public static generate(context: AnimationContext, series: PlotSeries[]): ScaleBoundaries {
		const lastPoints = Enumerable.from(
			Enumerable
				.from(series)
				.select(serie => serie.points)
				.where(points => points && points.length > 0)
				.select(points => points[points.length - 1])
				.selectMany(point => [point.x, point.y])
				.where(x => !!x)
				.toArray());

		const min = Math.max(lastPoints.min(), 1);
		const max = Math.max(lastPoints.max(), 1);
		return {
			horizontal: {
				min: context.options.horizontalMin ?? (min - MARGIN),
				max: context.options.horizontalMax ?? (max + MARGIN)
			},
			vertical: {
				min: context.options.verticalMin ?? (min - MARGIN),
				max: context.options.verticalMax ?? (max + MARGIN)
			}
		};
	}
}
