
import formatNumber from 'format-number';

import { ScaleLabelProvider, ScaleLabel, FrameInfo, Options } from '../../util/Types';
import { DateTime } from 'luxon';

const JAN_1 = DateTime.local().startOf('year');
const FORMAT = formatNumber({ integerSeparator: '.' });

export default class LinearScaleLabelProvider implements ScaleLabelProvider
{
	private options: Options;

	public constructor(options: Options)
	{
		this.options = options;
	}

	public getScaleLabels(frame: FrameInfo, horizontal: boolean): ScaleLabel[]
	{
		const generator = horizontal ?
			this.getDateLabels(frame) :
			this.getValueLabels(frame);
		return Array.from(generator);
	}

	private *getDateLabels(frame: FrameInfo): Generator<ScaleLabel>
	{
		const scale = frame.scaleBoundaries.horizontal;
		const jump = this.options.horizontalJump;
		const min = Math.ceil(scale.min / jump) * jump;
		for (let value = min; value <= scale.max; value += jump)
		{
			const date = JAN_1.plus({ days: value });
			const position = value;
			const text = date.toFormat(this.options.scaleDateFormat);
			yield { position, text };
		}
	}

	private *getValueLabels(frame: FrameInfo): Generator<ScaleLabel>
	{
		const scale = frame.scaleBoundaries.vertical;
		const jump = this.options.verticalJump;
		const min = Math.ceil(scale.min / jump) * jump;
		for (let value = min; value <= scale.max; value += jump)
		{
			const position = value;
			const text = FORMAT(value);
			yield { position, text };
		}
	}
}
