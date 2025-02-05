package com.babulens.weighbridge.configuration;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
@Order(1)
public class TransactionFilter implements Filter {
    public static final Set<String> list = new HashSet<>();

    public TransactionFilter() {
        list.add("0:0:0:0:0:0:0:1");
        list.add("127.0.0.1");
    }

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) {
        try {
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;
            String clientIp = request.getServerName().contains("babulens") ? null : request.getRemoteAddr();
            String sessionId = httpServletRequest.getSession().getId();
            if (httpServletRequest.getRequestURI().contains("error") || httpServletRequest.getRequestURI().contains("404.png")) {
                chain.doFilter(request, response);
            } else if ((httpServletRequest.getRequestURI().contains("console") || httpServletRequest.getRequestURI().contains("swagger")) && TransactionFilter.list.contains(clientIp)) {
                chain.doFilter(request, response);
            } else if (httpServletRequest.getRequestURI().contains("loginForm")) {
                ((HttpServletResponse) response).sendRedirect("/");
//				if (TransactionFilter.list.contains(sessionId) || TransactionFilter.list.contains(clientIp)) {
//					((HttpServletResponse) response).sendRedirect("/");
//				} else {
//					chain.doFilter(request, response);
//				}
//			} else if (httpServletRequest.getRequestURI().contains("login")) {
//				if ((httpServletRequest.getParameter("password") != null && httpServletRequest.getParameter("password").equals("147085")) || TransactionFilter.list.contains(clientIp)) {
//					TransactionFilter.list.add(sessionId);
//					((HttpServletResponse) response).sendRedirect("/");
//				} else {
//					((HttpServletResponse) response).sendRedirect("/loginForm");
//				}
            }

//			else if (TransactionFilter.list.contains(clientIp)) {
//				chain.doFilter(request, response);
//			} else if (Stream.of("getNextSlipNoByProfile", "getNextInvoiceNoByProfile", "getNextDummyInvoiceNoByProfile").anyMatch(value -> httpServletRequest.getRequestURI().contains(value))) {
//				((HttpServletResponse) response).sendRedirect("/error/getDefault");
//			} else if (!TransactionFilter.list.contains(httpServletRequest.getSession().getId())) {
//				((HttpServletResponse) response).sendRedirect("/loginForm");
//			}
            chain.doFilter(request, response);

        } catch (IOException | ServletException ignored) {
        }
    }
}