import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	constructor() {}

	@Get()
	getBase() {
		return 'Hello World';
	}
}
