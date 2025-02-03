import { describe, it, expect } from "vitest";
import { addTags } from "../addTags";

describe("addTags", () => {
  it('should wrap hashtags in span with class "note-tag"', () => {
    const content = "This is a test #tag";
    const result = addTags(content);
    expect(result).toBe('This is a test <span class="note-tag">#tag</span>');
  });

  it("should handle multiple hashtags", () => {
    const content = "This is a test #tag1 and another #tag2";
    const result = addTags(content);
    expect(result).toBe(
      'This is a test <span class="note-tag">#tag1</span> and another <span class="note-tag">#tag2</span>',
    );
  });

  it("should handle content without hashtags", () => {
    const content = "This is a test without tags";
    const result = addTags(content);
    expect(result).toBe("This is a test without tags");
  });

  it("should handle empty content", () => {
    const content = "";
    const result = addTags(content);
    expect(result).toBe("");
  });

  it("should handle content with only hashtags", () => {
    const content = "#tag1 #tag2";
    const result = addTags(content);
    expect(result).toBe(
      '<span class="note-tag">#tag1</span> <span class="note-tag">#tag2</span>',
    );
  });

  it("should handle content with special characters", () => {
    const content = "Special characters #tag1! @test #tag2";
    const result = addTags(content);
    expect(result).toBe(
      'Special characters <span class="note-tag">#tag1</span>! @test <span class="note-tag">#tag2</span>',
    );
  });

  it("leaves existing tags untouched", () => {
    const content = "This is a test <span class='note-tag'>#tag</span>";
    const result = addTags(content);
    expect(result).toBe('This is a test <span class="note-tag">#tag</span>');
  });

  it("adds tags to existing tags", () => {
    const content = "This is a test <span class='note-tag'>#tag</span> #tag2";
    const result = addTags(content);
    expect(result).toBe(
      'This is a test <span class="note-tag">#tag</span> <span class="note-tag">#tag2</span>',
    );
  });

  it("fixes existing tags", () => {
    const content =
      "This is a test <span class='note-tag'>#multiple word tag</span> #tag2";
    const result = addTags(content);
    expect(result).toBe(
      'This is a test <span class="note-tag">#multiple</span> word tag <span class="note-tag">#tag2</span>',
    );
  });

  it('creates empty tags for "#"', () => {
    const content = "This is a test #";
    const result = addTags(content);
    expect(result).toBe('This is a test <span class="note-tag">#</span>');
  });

  it("keeps <br> tags", () => {
    const content = "This <br />is a test<br>#tag";
    const result = addTags(content);
    expect(result).toBe(
      'This <br>is a test<br><span class="note-tag">#tag</span>',
    );
  });
});
