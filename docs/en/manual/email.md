# Email and attachments

Configure an email account with separate IMAP reading and SMTP sending settings. Complete a read-only test before sending.

## Configure and read

Enter server, port, encryption and credentials, using an app password where required. List accounts and folders, then read a message in a test folder.

A UID is scoped to its account and folder. Do not reuse a UID from another folder.

## Send and confirm

Review recipients, CC, subject, body and attachment paths. Sending has a separate foreground confirmation flow; background tasks cannot bypass it through ordinary auto-approval. Send a harmless test to yourself and check both the tool result and delivery.

## Attachment quarantine

Attachments are downloaded into a quarantined temporary area. Follow the scanning/handling workflow before processing them. Download completion does not grant the Agent permission to read or execute them. Check content and destination before using an attachment as project input.

## Troubleshooting

For read failures check IMAP, folder and UID; for send failures check SMTP, authentication and confirmation; for attachments check path, size and quarantine state. After a timeout, check delivery before retrying to avoid duplicates. See the [connections index](/en/manual/integrations).
