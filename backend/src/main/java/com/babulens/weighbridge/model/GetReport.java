package com.babulens.weighbridge.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class GetReport {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date startDate;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date endDate;
	private String inputLabel;
	private String input;
	private String profile;

	public GetReport() {
	}

	public GetReport(Date startDate, Date endDate, String inputLabel, String input, String profile) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.inputLabel = inputLabel;
		this.input = input;
		this.profile = profile;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getInputLabel() {
		return inputLabel;
	}

	public void setInputLabel(String inputLabel) {
		this.inputLabel = inputLabel;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}
}
