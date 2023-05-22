# SpringSecurity 的工作流程

1. 当用户提交他们的用户名和密码时，通过从实例中提取用户名和密码来UsernamePasswordAuthenticationFilter创建一个UsernamePasswordAuthenticationToken，这是一种类型。
2. 接下来，UsernamePasswordAuthenticationToken将传递给AuthenticationManager要进行身份验证的实例,AuthenticationManager取决于用户信息的存储方式。
3. 如果身份验证失败，则为Failure。 SecurityContextHolder被清除。
    1. RememberMeServices.loginFail被调用。如果 remember me 没有配置，这是一个空操作。请参阅RememberMeServicesJavadoc 中的接口。
    2. AuthenticationFailureHandler被调用。请参阅AuthenticationFailureHandlerJavadoc 中的类
4. 如果身份验证成功，则为Success。 SessionAuthenticationStrategy收到新登录通知。请参阅SessionAuthenticationStrategyJavadoc
   中的接口。
    1. 身份验证在SecurityContextHolder上设置。请参阅SecurityContextPersistenceFilterJavadoc 中的类。
    2. RememberMeServices.loginSuccess被调用。如果 remember me 没有配置，这是一个空操作。请参阅RememberMeServicesJavadoc
       中的接口。
    3. ApplicationEventPublisher发布一个InteractiveAuthenticationSuccessEvent. 被AuthenticationSuccessHandler调用。
       所以我们要设置