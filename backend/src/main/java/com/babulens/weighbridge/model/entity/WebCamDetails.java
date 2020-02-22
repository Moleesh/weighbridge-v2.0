package com.babulens.weighbridge.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class WebCamDetails implements Serializable {
	@Id
	private String name;
	private boolean myPrimary = false;
	private int x_Axis;
	private int y_Axis;
	private int width;
	private int height;

	public WebCamDetails() {
	}

	public WebCamDetails(String name, int x_Axis, int y_Axis, int width, int height) {
		this.name = name;
		this.x_Axis = x_Axis;
		this.y_Axis = y_Axis;
		this.width = width;
		this.height = height;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isMyPrimary() {
		return myPrimary;
	}

	public void setMyPrimary(boolean myPrimary) {
		this.myPrimary = myPrimary;
	}

	public int getX_Axis() {
		return x_Axis;
	}

	public void setX_Axis(int x_Axis) {
		this.x_Axis = x_Axis;
	}

	public int getY_Axis() {
		return y_Axis;
	}

	public void setY_Axis(int y_Axis) {
		this.y_Axis = y_Axis;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		WebCamDetails that = (WebCamDetails) o;
		return Objects.equals(name, that.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(name);
	}
}
