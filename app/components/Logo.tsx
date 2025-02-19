export default function Logo({
  useTailwind = false,
  sizeMultiplier = 1,
}: {
  /**
   * This should be toggled off for the opengraph image
   * This should only effect how it renders in dark mode
   */
  useTailwind: boolean;
  sizeMultiplier?: number;
}) {
  return (
    <h1
      style={{
        zIndex: 11,
        display: "flex",
        fontWeight: "bold",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        height={14 * sizeMultiplier}
        width={49 * sizeMultiplier}
        viewBox="0 0 49 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={useTailwind ? "text-black dark:text-white" : ""}
      >
        <path
          fill="currentColor"
          d="M6.28808 13.6421C2.73904 13.6421 0.651367 10.7889 0.651367 7.23987C0.651367 3.55164 2.94781 0.559314 7.33192 0.559314C11.8552 0.559314 13.3862 3.62123 13.4558 5.36096H10.1851C10.1155 4.38671 9.28041 2.92534 7.26233 2.92534C5.10507 2.92534 3.71329 4.80425 3.71329 7.10069C3.71329 9.39713 5.10507 11.276 7.26233 11.276C9.21082 11.276 10.0459 9.74507 10.3938 8.21411H7.26233V6.96151H13.8333V13.3637H10.9506V9.32754C10.7418 10.7889 9.83712 13.6421 6.28808 13.6421Z"
        />
        <path
          fill="currentColor"
          d="M19.678 13.6416C16.964 13.6416 15.2939 11.8323 15.2939 8.21362V0.767589H18.2166V8.21362C18.2166 10.0925 19.1213 10.9972 20.6522 10.9972C23.6445 10.9972 24.758 7.30896 24.758 4.73417V0.767589H27.6807V13.3632H24.8276V8.70074C24.2709 11.2755 22.7399 13.6416 19.678 13.6416Z"
        />
        <path
          fill="currentColor"
          d="M45.1462 0.552246C42.6528 0.552246 41.0798 2.96106 40.5663 5.1883C40.4785 2.20353 39.0107 0.552246 36.6621 0.552246C34.6331 0.552246 32.7506 2.36173 32.2617 5.22434V0.766511H29.4125V13.3624H32.2982V8.84684C32.2982 7.72739 32.7649 3.13331 35.6699 3.13331C37.5517 3.13331 37.7479 4.83076 37.7479 7.15106V13.3624H40.6322V8.84684C40.6322 7.72739 41.1182 3.13331 44.0232 3.13331C45.9033 3.13331 46.0977 4.83076 46.0977 7.15106V13.3624H48.986V5.91202C48.9993 2.33773 47.7373 0.552246 45.1462 0.552246Z"
        />
      </svg>
      <span
        style={{
          marginLeft: `${8 * sizeMultiplier}px`,
          borderRadius: "9999px",
          border: `${1 * sizeMultiplier}px solid`,
          paddingLeft: `${8 * sizeMultiplier}px`,
          paddingRight: `${8 * sizeMultiplier}px`,
          backgroundColor: "rgb(255, 144, 232)",
          fontSize: `${16 * sizeMultiplier}px`,
          fontWeight: 600,
        }}
        className={useTailwind ? "border-background dark:border-white dark:text-white" : ""}
      >
        .new
      </span>
    </h1>
  );
}
