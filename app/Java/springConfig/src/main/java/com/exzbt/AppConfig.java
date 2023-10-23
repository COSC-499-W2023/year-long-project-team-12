package com.exzbt;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class AppConfig {
    public static ApplicationContext applicationContext =
            new AnnotationConfigApplicationContext(AppConfig.class);

    @Bean
    public String String(){
        return new String();
    }

}
