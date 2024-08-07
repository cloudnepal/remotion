import {hasAudioCodec} from './get-audio-codec';
import {hasDimensions} from './get-dimensions';
import {hasDuration} from './get-duration';
import {hasFps} from './get-fps';
import {hasVideoCodec} from './get-video-codec';
import type {Options} from './options';
import type {ParseResult} from './parse-result';

export const hasAllInfo = (
	options: Options<boolean, boolean, boolean, boolean, boolean, boolean>,
	parseResult: ParseResult,
) => {
	const keys = Object.entries(options)
		.filter(([, value]) => value)
		.map(([key]) => key) as (keyof Options<
		true,
		true,
		true,
		true,
		true,
		true
	>)[];

	return keys.every((key) => {
		if (key === 'boxes') {
			return parseResult.status === 'done';
		}

		if (key === 'durationInSeconds') {
			return hasDuration(parseResult.segments);
		}

		if (key === 'dimensions') {
			return hasDimensions(parseResult.segments);
		}

		if (key === 'fps') {
			return hasFps(parseResult.segments) !== null;
		}

		if (key === 'videoCodec') {
			return hasVideoCodec(parseResult.segments) !== null;
		}

		if (key === 'audioCodec') {
			return hasAudioCodec(parseResult.segments) !== null;
		}

		throw new Error(`Unknown key: ${key satisfies never}`);
	});
};
