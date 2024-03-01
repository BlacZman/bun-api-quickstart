import type { Action, ClassConstructor, IocAdapter } from 'routing-controllers';
import type { DependencyContainer } from 'tsyringe';

class TsyringeAdapter implements IocAdapter {
	constructor(private readonly container: DependencyContainer) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	get<T>(someClass: ClassConstructor<T>, _action?: Action): T {
		const childContainer = this.container.createChildContainer();
		return childContainer.resolve<T>(someClass);
	}
}

export default TsyringeAdapter;