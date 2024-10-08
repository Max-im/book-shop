import { ping } from 'tcp-ping';

describe('Healthcheck', () => {
    describe('Reservation', async () => {
        const response = await fetch('http://reservation:3000');
        expect(response.ok).toBeTruthy();
    });

    describe('Auth', async () => {
        const response = await fetch('http://auth:3001');
        expect(response.ok).toBeTruthy();
    });

    describe('Payments', (done) => {
        ping({ address: 'payments', port: 3003 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });

    describe('Notification', (done) => {
        ping({ address: 'notification', port: 3004 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });
});
