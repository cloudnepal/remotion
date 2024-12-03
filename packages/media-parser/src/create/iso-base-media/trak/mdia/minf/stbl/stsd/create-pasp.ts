import {combineUint8Arrays} from '../../../../../../../boxes/webm/make-header';
import {
	addSize,
	numberTo32BitUIntOrInt,
	stringsToUint8Array,
} from '../../../../../primitives';

export const createPasp = (x: number, y: number) => {
	return addSize(
		combineUint8Arrays([
			stringsToUint8Array('pasp'),
			numberTo32BitUIntOrInt(x),
			numberTo32BitUIntOrInt(y),
		]),
	);
};
