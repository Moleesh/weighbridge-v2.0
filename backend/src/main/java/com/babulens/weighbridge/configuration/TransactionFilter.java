package com.babulens.weighbridge.configuration;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@Order(1)
public class TransactionFilter implements Filter {
	public static Set<String> list = new HashSet<>();

	public TransactionFilter() {
		try {
			list.add(InetAddress.getLocalHost().getHostAddress());
		} catch (UnknownHostException ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
		}
		list.add("0:0:0:0:0:0:0:1");
		list.add("127.0.0.1");
	}

	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		String clientIp = request.getRemoteAddr();
		String sessionId = httpServletRequest.getSession().getId();
		if (TransactionFilter.list.contains(clientIp) || httpServletRequest.getContextPath().contains("404")) {
			chain.doFilter(request, response);
		} else if (httpServletRequest.getContextPath().contains("loginForm")) {
			if (TransactionFilter.list.contains(sessionId)) {
				((HttpServletResponse) response).sendRedirect("/");
			} else {
				chain.doFilter(request, response);
			}
		} else if (httpServletRequest.getContextPath().contains("login")) {
			if (httpServletRequest.getParameter("password").equals("147085")) {
				TransactionFilter.list.add(sessionId);
				((HttpServletResponse) response).sendRedirect("/");
			} else {
				((HttpServletResponse) response).sendRedirect("/404");
			}
		} else if (httpServletRequest.getContextPath().contains("getNextSlipNo")) {
			((HttpServletResponse) response).sendRedirect("/getDefaultSlipNo");
		} else if (!TransactionFilter.list.contains(httpServletRequest.getSession().getId())) {
			((HttpServletResponse) response).sendRedirect("/404");
		} else {
			chain.doFilter(request, response);
		}
	}
}