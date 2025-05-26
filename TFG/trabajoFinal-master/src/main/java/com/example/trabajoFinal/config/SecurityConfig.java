// package com.example.trabajoFinal.config;

// import java.util.List;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//   @Bean
//   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//     http
//       .csrf(csrf -> csrf.disable())
//       .cors(Customizer.withDefaults())
//       .authorizeHttpRequests(auth -> auth
//         // 1) allow all OPTIONS preflight
//         .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

//         // 2) explicitly allow POST to register & login
//         .requestMatchers(HttpMethod.POST, "/api/user/register", "/api/user/login")
//           .permitAll()
//           .requestMatchers("/api/user/me").authenticated()  // Protege el endpoint de `/me`

//         // 3) everything else needs authentication
//         .anyRequest().authenticated()
//       )
//       .formLogin(form -> form.disable())
//       .httpBasic(basic -> basic.disable());

//     return http.build();
//   }

//   // Make sure to keep this bean so CORS actually works
//   @Bean
//   CorsConfigurationSource corsConfigurationSource() {
//     CorsConfiguration config = new CorsConfiguration();
//     config.setAllowedOrigins(List.of("http://localhost:3000"));
//     config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//     config.setAllowedHeaders(List.of("*"));
//     config.setAllowCredentials(true);

//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", config);
//     return source;
//   }
// }
