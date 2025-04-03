import { test as teardown } from '@playwright/test';
import { deleteFiles } from './e2e/helpers/global-helpers';

teardown('remove files', async () => {
  await deleteFiles();
});