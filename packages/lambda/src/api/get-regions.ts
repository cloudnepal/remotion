import type {AwsRegion} from '../regions';
import {AWS_REGIONS, DEFAULT_AWS_REGIONS} from '../regions';

type Options = {
	enabledByDefaultOnly?: boolean;
};

/**
 * @description Gets an array of all supported AWS regions of this release of Remotion Lambda.
 * @see [Documentation](https://remotion.dev/docs/lambda/getregions)
 * @returns {AwsRegion[]} A list of AWS regions.
 */
export const getRegions = (options?: Options): readonly AwsRegion[] => {
	const onlyEnabledByDefault = options?.enabledByDefaultOnly ?? false;
	return onlyEnabledByDefault ? DEFAULT_AWS_REGIONS : AWS_REGIONS;
};
