import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import axios from 'axios';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));



export default function SignInCard() {
  



  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // 获取导航函数

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // const validateInputs = (event) => {


  //   const email = document.getElementById('email');
  //   const password = document.getElementById('password');

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage('Please enter a valid email address.');
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage('');
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage('Password must be at least 6 characters long.');
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage('');
  //   }

  //   // 如果验证成功，模拟与数据库的对比，跳转到 Dashboard
  //   if (isValid) {
  //     // 模拟的用户数据
  //     const validEmail = 'user@example.com';
  //     const validPassword = 'password123';
  //     const validStaff = 'staff@example.com';
  //     const validPasswordStaff = 'password456';
  //     const validSupplier = 'supplier@example.com';
  //     const validPasswordSupplier = 'password789';

  //     // 储存用户输入的邮箱和密码
  //     // localStorage.setItem('email', email.value);
  //     // localStorage.setItem('password', password.value);

  //     // 跳转到对应页面
  //     if (email.value === validEmail && password.value === validPassword) {
  //       navigate('/dashboard');
  //     } else if (email.value === validStaff && password.value === validPasswordStaff) {
  //       navigate('/dashboard_staff');
  //     } else if (email.value === validSupplier && password.value === validPasswordSupplier) {
  //       navigate('/dashboard_supplier');
  //     } else {
  //       alert('Invalid credentials, please try again.');
  //     }
  //   }

  //   event.preventDefault(); // 阻止表单提交

  //   // return isValid;
  // };


  const handleStaffLogin = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
  
    // 确保与 HTML 中的 id 名称匹配
    const employee_id = document.getElementById('email').value;
    const password = document.getElementById('password')?.value;
  
    // 检查 DOM 元素是否存在
    if (!employee_id || !password) {
      alert('员工 ID 或密码不能为空！');
      return;
    }
  
    // 在发送请求之前 alert 数据内容
    alert(`Sending Staff Login Data: employee_id=${employee_id}, password=${password}`);
  
    try {
      // 发送员工登录请求
      const response = await fetch(
        'http://phphermesbackendv2-env.us-east-1.elasticbeanstalk.com/login.php/employee',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 设置 Content-Type 为 URL 编码
          },
          body: `employee_id=${encodeURIComponent(employee_id)}&password=${encodeURIComponent(password)}`, // URL 编码请求体
        }
      );
  
      const data = await response.json(); // 解析 JSON 响应
      
  
      if (data.status === 'success') {
        const position = data.message.position;
        const employeeId = data.message.employee_id;
  
        // 存储数据到 localStorage
        localStorage.setItem('position', position);
        localStorage.setItem('employee_id', employeeId);
        localStorage.setItem('password', password);
  
        // 根据 position 导航到对应的页面
        if (position === 'Manager') {
          navigate('/dashboard');
        } else if (position === 'Salesman') {
          navigate('/dashboard_staff');
        } else if (position === 'buyer') {
          navigate('/dashboard_supplier');
        } else {
          alert(`Unexpected Position: ${position}`);
        }
  
        alert(`Login successful! Position: ${position}`);
      } else {
        alert(`Login failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      
    }
  };
  
  const handleCustomerLogin = async (event) => {
    event.preventDefault(); // 阻止表单默认提交行为
  
    // 确保与 HTML 中的 id 名称匹配
    const customer_id = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // 检查 DOM 元素是否存在
    if (!customer_id || !password) {
      alert('顾客 ID 或密码不能为空！');
      return;
    }
  
    // 在发送请求之前 alert 数据内容
    alert(`Sending Customer Login Data: customer_id=${customer_id}, password=${password}`);
  
    try {
      // 发送顾客登录请求
      const response = await fetch(
        'http://phphermesbackendv2-env.us-east-1.elasticbeanstalk.com/login.php/customer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 设置 Content-Type 为 URL 编码
          },
          body: `customer_id=${encodeURIComponent(customer_id)}&password=${encodeURIComponent(password)}`, // URL 编码请求体
        }
      );
  
      const data = await response.json(); // 解析 JSON 响应
      //document.getElementById('customerResponse').textContent = `响应: ${JSON.stringify(data)}`;
  
      if (data.status === 'success') {
        const customerId = data.message;
  
        // 存储数据到 localStorage
        localStorage.setItem('customer_id', customerId);
        localStorage.setItem('password', password);
        navigate('/mainpage');
        alert(`Login successful! Customer ID: ${customerId}`);
      } else {
        alert(`Login failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      
    }
  };


  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >

        <FormControl>
          <FormLabel htmlFor="email">Employee / Customer ID</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="button" fullWidth variant="contained" onClick={handleCustomerLogin}>
          Sign in customer
        </Button>
        <Button type="button" fullWidth variant="outlined" onClick={handleStaffLogin}
        >
          Sign in staff
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              component="button"
              type="button"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
}
