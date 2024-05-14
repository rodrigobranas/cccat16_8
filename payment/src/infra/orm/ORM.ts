import DatabaseConnection from "../database/DatabaseConnection";

export default class ORM {

	constructor (readonly connection: DatabaseConnection) {
	}

	async save (model: Model) {
		const columns = model.columns.map((column: any) => column.column).join(",");
		const params  = model.columns.map((column: any, index: number) => `$${index + 1}`).join(",");
		const values  = model.columns.map((column: any) => model[column.property]);
		const query = `insert into ${model.schema}.${model.table} (${columns}) values (${params})`;
		await this.connection.query(query, values);
	}

	async get (field: string, value: any, model: any) {
		const query = `select * from ${model.prototype.schema}.${model.prototype.table} where ${field} = $1`;
		const [data] = await this.connection.query(query, [value]);
		const obj = new model();
		for (const column of model.prototype.columns) {
			if (column.type === "number") {
				obj[column.property] = parseFloat(data[column.column]);	
			} else {
				obj[column.property] = data[column.column];
			}
		}
		return obj;
	}
}

export abstract class Model {
	schema!: string;
	table!: string;
	columns!: { column: string, property: string, pk: boolean, type: string }[];
	[property: string]: any;
}

export function model (schema: string, table: string) {
	return function (constructor: Function) {
		constructor.prototype.schema = schema;
		constructor.prototype.table = table;
	}
}

export function column (name: string, type: string = 'text', pk: boolean = false) {
	return function (target: any, propertyKey: string) {
		target.columns = target.columns || [];
		target.columns.push({ property: propertyKey, column: name, pk, type });
	}
}
