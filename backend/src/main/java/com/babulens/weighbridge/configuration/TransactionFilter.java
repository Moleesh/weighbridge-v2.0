package com.babulens.weighbridge.configuration;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

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
			String clientIp = request.getRemoteAddr();
			String sessionId = httpServletRequest.getSession().getId();
			if (httpServletRequest.getRequestURI().contains("error")) {
				chain.doFilter(request, response);
			} else if ((httpServletRequest.getRequestURI().contains("console") || httpServletRequest.getRequestURI().contains("swagger")) && TransactionFilter.list.contains(clientIp)) {
				chain.doFilter(request, response);
			} else if (httpServletRequest.getRequestURI().contains("loginForm")) {
				if (TransactionFilter.list.contains(sessionId) || TransactionFilter.list.contains(clientIp)) {
					((HttpServletResponse) response).sendRedirect("/");
				} else {
					chain.doFilter(request, response);
				}
			} else if (httpServletRequest.getRequestURI().contains("login")) {
				if ((httpServletRequest.getParameter("password") != null && httpServletRequest.getParameter("password").equals("147085")) || TransactionFilter.list.contains(clientIp)) {
					TransactionFilter.list.add(sessionId);
					((HttpServletResponse) response).sendRedirect("/");
				} else {
					((HttpServletResponse) response).sendRedirect("/loginForm");
				}
			} else if (TransactionFilter.list.contains(clientIp)) {
				chain.doFilter(request, response);
			} else if (Stream.of("getNextSlipNoByProfile", "getNextInvoiceNoByProfile", "getNextDummyInvoiceNoByProfile").anyMatch(value -> httpServletRequest.getRequestURI().contains(value))) {
				((HttpServletResponse) response).sendRedirect("/error/getDefault");
			} else if (!TransactionFilter.list.contains(httpServletRequest.getSession().getId())) {
				((HttpServletResponse) response).sendRedirect("/loginForm");
			} else {
				chain.doFilter(request, response);
			}
		} catch (IOException ignored) {
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}