import { test as setup } from "@playwright/test";
import fs from 'fs';
import FormData from 'form-data';

setup('upload test files', async ({ request }) => {
  const files = [
    {
      name: '[E2E-SMOKE]-tiger.png',
      path: './playwright-tests/fixtures/[E2E-SMOKE]-tiger.png'
    },
    {
      name: '[E2E-SMOKE]-new-document.pdf',
      path: './playwright-tests/fixtures/[E2E-SMOKE]-new-document.pdf'
    },
  ];

  const formData = new FormData();

  files.forEach((file) => {
    formData.append(
      'files',
      fs.readFileSync(file.path),
      file.name
    );
  });

  await request.post('/api/upload', {
    headers: formData.getHeaders(),
    data: formData.getBuffer()
  });
});