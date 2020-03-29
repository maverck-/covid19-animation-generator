
// Dependencies
import * as path from 'path';

// Local
import ConfigLoader from './util/ConfigLoader';
import DataLoader from './util/DataLoader';
import ImageGenerator from './util/ImageGenerator';

// Constants
const INPUT_FILE = path.join(__dirname, '../resources/input.csv');
const OUTPUT_PATH = path.join(__dirname, '../output');

// Main
(async () =>
{
	// Read input
	const config = await ConfigLoader.load ();
	const data = await DataLoader.load (INPUT_FILE);

	// Generate
	const generator = new ImageGenerator(data, config.countries);
	await generator.generateAll(OUTPUT_PATH);
})();