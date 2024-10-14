import exp from "constants";

describe('Reservation', () => {
    let jwt: string;
    const headers = {
        'Content-Type': 'application/json',
    };

    beforeAll(async () => {
        const user = {
            email: 'emailer@gmail.com',
            password: '1Q2w3e4r5t6y-1',
        };

        await fetch('http://auth:3001/auth', {
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        });
        const response = await fetch('http://auth:3001/auth/login', {
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        });

        const data = await response.json();
        jwt = data.token;
    });

    test('Create a reservation', async () => {
        const response = await fetch('http://reservation:3000/reservation', {
            method: 'POST',
            headers: {
                ...headers,
                Authorization: jwt,
            },
            body: JSON.stringify({
                placeId: 'test-placeId',
                invoiceId: 'test-invoiceId',
                startDate: '2024-09-05T15:00:00.000Z',
                endDate: '2024-09-05T15:00:00.000Z',
                charge: {
                    amount: 5.09,
                    token: 'tok_visa',
                },
            }),
        });
        expect(response.ok).toBeTruthy();
        expect(response.status).toBe(201);
    });
});
