package com.exzbt.business.user.security.jwt;

import com.exzbt.business.user.UserService;
import com.exzbt.business.user.shared.UserDetailsDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final UserService userService;

    public JWTAuthenticationFilter(JWTUtil jwtUtil,
                                   UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String subject = jwtUtil.getSubject(jwt);

        if (subject != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetailsDTO userDetails = userService.findUserByUsername(subject);
            if (jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {

                List<userRole> active = new ArrayList<>();
                userRole role = new userRole();
                if (Objects.nonNull(userDetails.getUserRole())) {
                    role.setUserRole(userDetails.getUserRole());
                    active.add(role);
                }

                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, active);

                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);

    }
}

class userRole implements GrantedAuthority {
    private String userRole;

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    @Override
    public String getAuthority() {
        return userRole;
    }
}
