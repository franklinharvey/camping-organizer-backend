import { Controller, Get, Param } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
	constructor() {}

	@Get()
	getBase() {
		return 'Hello World';
	}

	@Get('.well-known/acme-challenge/:id')
	getCert(@Param('id') id: string) {
		const cert = readFileSync(__dirname + '/../crt.crt');
		return `${id}.${cert}`;
	}
}
