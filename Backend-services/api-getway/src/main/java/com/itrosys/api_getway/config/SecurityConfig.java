    package com.itrosys.api_getway.config;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
    import org.springframework.security.config.web.server.ServerHttpSecurity;
    import org.springframework.security.web.server.SecurityWebFilterChain;
    import org.springframework.web.reactive.config.CorsRegistry;
    import org.springframework.web.reactive.config.WebFluxConfigurer;
    import org.springframework.web.reactive.config.WebFluxConfigurerComposite;

    @Configuration
    @EnableWebFluxSecurity
    public class SecurityConfig {

        @Bean
        public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
            http
                    .csrf(csrf -> csrf.disable())
                    .authorizeExchange(exchange -> exchange
                            .pathMatchers("/public/**").permitAll()
                            .pathMatchers("/api/admissions/student/register").permitAll()
                            .pathMatchers("/student/**").permitAll()
                            .pathMatchers("/api/admin/**").permitAll()
                            .pathMatchers("/api/admissions/**").permitAll()
                            .anyExchange().permitAll()
                    );

//                    .oauth2Login(Customizer.withDefaults())
//
//
//                    .oauth2ResourceServer(oauth2 -> oauth2
//                            .jwt(jwtSpec -> {}) // DSL-style, no bearerTokenResolver needed for WebFlux
//                    );

            return http.build();
        }

        @Bean
        public WebFluxConfigurer corsConfigurer() {
            return new WebFluxConfigurerComposite() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOrigins("*")
                            .allowedMethods("*");
                }
            };
        }
    }
