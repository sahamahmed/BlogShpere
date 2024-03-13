import conf from "../conf/conf.js";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
export default function RTE({ name, control, label, defaultValue = "" }) {
  // console.log(conf.tinymceId);
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block font-medium text-lg text-white mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={conf.tinymceId}
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
              content_style: `
                body { background-color: #f5f5f5; } 
                .tox-toolbar { background-color: #f5f5f5; } 
              `,
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              tabfocus_elements: ".tox-toolbar__primary",
              tab_focus: true,
              tab_focus_elements: ".tox-toolbar__primary",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
