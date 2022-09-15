import React from 'react';
import { Row, Col, Form, Input, Button, Space, notification } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

function Footer() {
	const [form] = Form.useForm();

	const onComplete = (fields) => {
		const message = {
			to: 'manchandaa45@gmail.com',
			from: fields.email,
			subject: "NodeJS says Hello",
			html: `
      <p><strong>Name:</strong> ${fields.name}</p>
      <p>${fields.message}</p>`,
		};

		sgMail
			.send(message)
			.then(() => {
				form.resetFields();
				console.log('Email Sent!');
				notification.open({
					message: 'Message successfu!',
					description: 'We have successfully received your email.',
				});
			})
			.catch((error) => {
				console.error('Error: ', error);
			});
	};

	return (
		<Row gutter={24} style={{ padding: '30px' }}>
			<Col xl={12}>
				<Form layout='vertical' form={form} onFinish={onComplete}>
					
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{
								required: true,
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Space>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
							<Button
								type='secondary'
								htmlType='submit'
								onClick={(e) => form.resetFields()}>
								Clear
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
}

export default Footer;
