// its important to set container before any operation you do with routing-controllers,
import 'reflect-metadata';

import { useContainer } from 'routing-controllers';
import { container } from 'tsyringe';
import { Server } from '@/server';
import TsyringeAdapter from '@/common/dependencyinjection/TsyringeAdapter';

// including importing controllers
useContainer(new TsyringeAdapter(container));

const server = container.resolve(Server);

// eslint-disable-next-line no-void
void server.initializeAndStart();