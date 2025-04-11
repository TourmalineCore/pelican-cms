import { test as teardown } from '@playwright/test';
import { deleteFiles } from './helpers/global-helpers';

teardown('remove test files', async () => {
  await deleteFiles();
});